from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import List
from uuid import UUID

from ..db import get_session
from ..models.dp import Funcionario, FuncionarioStatus
from ..schemas.dp import FuncionarioCreate, FuncionarioResponse, FuncionarioUpdate, DPDashboardStats

router = APIRouter(
    prefix="/dp",
    tags=["dp"],
)

@router.post("/funcionarios", response_model=FuncionarioResponse, status_code=status.HTTP_201_CREATED)
def create_funcionario(funcionario: FuncionarioCreate, db: Session = Depends(get_session)):
    db_func = Funcionario(**funcionario.dict())
    db.add(db_func)
    db.commit()
    db.refresh(db_func)
    return db_func

@router.get("/funcionarios", response_model=List[FuncionarioResponse])
def read_funcionarios(skip: int = 0, limit: int = 100, db: Session = Depends(get_session)):
    funcionarios = db.query(Funcionario).offset(skip).limit(limit).all()
    return funcionarios

@router.get("/dashboard", response_model=DPDashboardStats)
def get_dashboard_stats(db: Session = Depends(get_session)):
    total_ativos = db.query(Funcionario).filter(Funcionario.status == FuncionarioStatus.ATIVO.value).count()
    total_ferias = db.query(Funcionario).filter(Funcionario.status == FuncionarioStatus.FERIAS.value).count()
    
    # Calculate total payroll for active employees
    total_folha = db.query(func.sum(Funcionario.salario)).filter(Funcionario.status == FuncionarioStatus.ATIVO.value).scalar() or 0.0
    
    return DPDashboardStats(
        total_ativos=total_ativos,
        total_ferias=total_ferias,
        total_folha=total_folha
    )
