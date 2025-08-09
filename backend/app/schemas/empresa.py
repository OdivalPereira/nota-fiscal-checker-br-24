from uuid import UUID
from pydantic import BaseModel


class EmpresaBase(BaseModel):
    nome: str
    cnpj: str | None = None


class EmpresaCreate(EmpresaBase):
    pass


class EmpresaRead(EmpresaBase):
    id: UUID

    class Config:
        orm_mode = True
