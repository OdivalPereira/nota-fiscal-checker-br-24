from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..db import get_session
from ..models import Empresa
from ..schemas.empresa import EmpresaCreate, EmpresaRead

router = APIRouter(prefix="/empresas", tags=["empresas"])


@router.post("", response_model=EmpresaRead)
def create_empresa(data: EmpresaCreate, db: Session = Depends(get_session)):
    empresa = Empresa(**data.dict())
    db.add(empresa)
    db.commit()
    db.refresh(empresa)
    return empresa


@router.get("", response_model=list[EmpresaRead])
def list_empresas(db: Session = Depends(get_session)):
    return db.query(Empresa).all()
