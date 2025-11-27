from sqlalchemy import Column, String, Float, ForeignKey, Enum
from sqlalchemy.orm import relationship
import enum

from .base import Base, TimestampMixin, UUIDBase

class NFeStatus(str, enum.Enum):
    AUTORIZADA = "AUTORIZADA"
    CANCELADA = "CANCELADA"
    DENEGADA = "DENEGADA"
    PENDENTE = "PENDENTE"

class NFe(UUIDBase, TimestampMixin, Base):
    __tablename__ = "nfes"

    numero = Column(String, nullable=False)
    chave = Column(String, unique=True, nullable=False)
    valor = Column(Float, nullable=False)
    status = Column(String, nullable=False, default=NFeStatus.PENDENTE.value)
    emitente = Column(String, nullable=False)
    destinatario = Column(String, nullable=False)
    
    empresa_id = Column(ForeignKey("empresas.id"), nullable=False)
    empresa = relationship("Empresa", backref="nfes")
