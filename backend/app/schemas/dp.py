from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from uuid import UUID

class FuncionarioBase(BaseModel):
    nome: str
    cpf: str
    cargo: str
    salario: float
    status: str
    empresa_id: UUID

class FuncionarioCreate(FuncionarioBase):
    pass

class FuncionarioUpdate(BaseModel):
    nome: Optional[str] = None
    cpf: Optional[str] = None
    cargo: Optional[str] = None
    salario: Optional[float] = None
    status: Optional[str] = None
    empresa_id: Optional[UUID] = None

class FuncionarioResponse(FuncionarioBase):
    id: UUID
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True

class DPDashboardStats(BaseModel):
    total_ativos: int
    total_ferias: int
    total_folha: float
