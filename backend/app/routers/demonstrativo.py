from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..db import get_session
from ..models import Conta, Empresa, PeriodoTrimestral, ValorConta
from ..schemas.demonstrativo import Demonstrativo, DemonstrativoConta
from ..services.calculo import calcular_demonstrativo

router = APIRouter(prefix="/empresas", tags=["demonstrativo"])


def _parse_periodo(periodo: str):
    try:
        ano_str, tri_str = periodo.split("-")
        ano = int(ano_str)
        trimestre = int(tri_str.replace("Q", ""))
        return ano, trimestre
    except Exception as exc:  # pragma: no cover - simple validation
        raise HTTPException(status_code=400, detail="periodo inválido") from exc


@router.get("/{empresa_id}/demonstrativo", response_model=Demonstrativo)
def demonstrativo(empresa_id: str, periodo: str, db: Session = Depends(get_session)):
    ano, trimestre = _parse_periodo(periodo)
    empresa = db.get(Empresa, empresa_id)
    if not empresa:
        raise HTTPException(status_code=404, detail="Empresa não encontrada")
    periodo_obj = (
        db.query(PeriodoTrimestral)
        .filter_by(ano=ano, trimestre=trimestre)
        .first()
    )
    if not periodo_obj:
        raise HTTPException(status_code=404, detail="Período não encontrado")

    valores = (
        db.query(ValorConta, Conta)
        .join(Conta, ValorConta.conta_id == Conta.id)
        .filter(
            ValorConta.empresa_id == empresa_id,
            ValorConta.periodo_id == periodo_obj.id,
        )
        .all()
    )
    mapa = {conta.codigo: float(vc.valor) for vc, conta in valores}
    calc = calcular_demonstrativo(mapa)

    contas_resp = [
        DemonstrativoConta(codigo=k, valor=v) for k, v in mapa.items()
    ]
    return Demonstrativo(
        contas=contas_resp,
        lucro_liquido=calc["lucro_liquido"],
        irpj=calc["irpj"] + calc["adicional_ir"],
        csll=calc["csll"],
    )
