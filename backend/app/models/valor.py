from sqlalchemy import Column, ForeignKey, Numeric, PrimaryKeyConstraint

from .base import Base, TimestampMixin


class ValorConta(TimestampMixin, Base):
    __tablename__ = "valores"
    __table_args__ = (
        PrimaryKeyConstraint("empresa_id", "periodo_id", "conta_id"),
    )

    empresa_id = Column(ForeignKey("empresas.id"), nullable=False)
    periodo_id = Column(ForeignKey("periodos.id"), nullable=False)
    conta_id = Column(ForeignKey("contas.id"), nullable=False)
    valor = Column(Numeric, nullable=False)
