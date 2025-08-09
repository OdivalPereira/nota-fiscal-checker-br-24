from sqlalchemy import Column, String

from .base import Base, TimestampMixin, UUIDBase


class Empresa(UUIDBase, TimestampMixin, Base):
    __tablename__ = "empresas"

    nome = Column(String, nullable=False)
    cnpj = Column(String, nullable=True)
