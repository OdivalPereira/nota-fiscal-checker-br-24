from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import select
from uuid import uuid4

from ..db import get_session
from ..models import Conta, PeriodoTrimestral, ValorConta
from ..schemas.valor import ValorInput

router = APIRouter(prefix="/empresas", tags=["valores"])


def _parse_periodo(periodo: str):
    ano_str, tri_str = periodo.split("-")
    return int(ano_str), int(tri_str.replace("Q", ""))


@router.post("/{empresa_id}/valores")
def salvar_valores(empresa_id: str, data: ValorInput, db: Session = Depends(get_session)):
    ano, trimestre = _parse_periodo(data.periodo)
    periodo = db.query(PeriodoTrimestral).filter_by(ano=ano, trimestre=trimestre).first()
    if not periodo:
        periodo = PeriodoTrimestral(ano=ano, trimestre=trimestre)
        db.add(periodo)
        db.commit()
        db.refresh(periodo)

    contas = {c.codigo: c for c in db.execute(select(Conta)).scalars()}
    for cv in data.valores:
        conta = contas.get(cv.conta_codigo)
        if not conta:
            continue
        valor = db.query(ValorConta).filter_by(
            empresa_id=empresa_id, periodo_id=periodo.id, conta_id=conta.id
        ).first()
        if not valor:
            valor = ValorConta(
                empresa_id=empresa_id,
                periodo_id=periodo.id,
                conta_id=conta.id,
                valor=cv.valor,
            )
            db.add(valor)
        else:
            valor.valor = cv.valor
    db.commit()
    return {"status": "ok"}
