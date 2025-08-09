from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from .base import Base, TimestampMixin, UUIDBase


class Conta(UUIDBase, TimestampMixin, Base):
    __tablename__ = "contas"

    codigo = Column(String, unique=True, nullable=False)
    descricao = Column(String, nullable=False)
    grupo_id = Column(ForeignKey("grupos.id"), nullable=False)
    derivada = Column(Boolean, default=False)
    ordem = Column(Integer, nullable=False)

    grupo = relationship("GrupoConta", backref="contas")
