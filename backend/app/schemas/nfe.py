from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from uuid import UUID

class NFeBase(BaseModel):
    numero: str
    chave: str
    valor: float
    status: str
    emitente: str
    destinatario: str
    empresa_id: UUID

class NFeCreate(NFeBase):
    pass

class NFeUpdate(BaseModel):
    numero: Optional[str] = None
    chave: Optional[str] = None
    valor: Optional[float] = None
    status: Optional[str] = None
    emitente: Optional[str] = None
    destinatario: Optional[str] = None
    empresa_id: Optional[UUID] = None

class NFeResponse(NFeBase):
    id: UUID
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True

class NFeDashboardStats(BaseModel):
    total_autorizadas: int
    total_canceladas: int
    total_denegadas: int
    total_pendentes: int
    valor_total_autorizadas: float
