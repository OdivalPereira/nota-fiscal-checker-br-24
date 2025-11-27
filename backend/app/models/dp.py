from sqlalchemy import Column, String, Float, ForeignKey, Enum
from sqlalchemy.orm import relationship
import enum

from .base import Base, TimestampMixin, UUIDBase

class FuncionarioStatus(str, enum.Enum):
    ATIVO = "ATIVO"
    FERIAS = "FERIAS"
    DESLIGADO = "DESLIGADO"

class Funcionario(UUIDBase, TimestampMixin, Base):
    __tablename__ = "funcionarios"

    nome = Column(String, nullable=False)
    cpf = Column(String, unique=True, nullable=False)
    cargo = Column(String, nullable=False)
    salario = Column(Float, nullable=False)
    status = Column(String, nullable=False, default=FuncionarioStatus.ATIVO.value)
    
    empresa_id = Column(ForeignKey("empresas.id"), nullable=False)
    empresa = relationship("Empresa", backref="funcionarios")
