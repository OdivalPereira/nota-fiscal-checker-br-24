from pydantic import BaseModel
from uuid import UUID


class ContaValor(BaseModel):
    conta_codigo: str
    valor: float


class ValorInput(BaseModel):
    periodo: str
    valores: list[ContaValor]


class ValorRead(BaseModel):
    empresa_id: UUID
    periodo_id: UUID
    conta_codigo: str
    valor: float

    class Config:
        orm_mode = True
