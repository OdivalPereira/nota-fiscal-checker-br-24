from sqlalchemy import Column, Integer, UniqueConstraint

from .base import Base, TimestampMixin, UUIDBase


class PeriodoTrimestral(UUIDBase, TimestampMixin, Base):
    __tablename__ = "periodos"
    __table_args__ = (UniqueConstraint("ano", "trimestre"),)

    ano = Column(Integer, nullable=False)
    trimestre = Column(Integer, nullable=False)
