from pydantic import BaseModel


class DemonstrativoConta(BaseModel):
    codigo: str
    valor: float


class Demonstrativo(BaseModel):
    contas: list[DemonstrativoConta]
    lucro_liquido: float
    irpj: float
    csll: float
