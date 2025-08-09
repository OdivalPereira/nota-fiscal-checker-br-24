from sqlalchemy import Column, Integer, String

from .base import Base, TimestampMixin, UUIDBase


class GrupoConta(UUIDBase, TimestampMixin, Base):
    __tablename__ = "grupos"

    nome = Column(String, nullable=False)
    ordem = Column(Integer, nullable=False)
