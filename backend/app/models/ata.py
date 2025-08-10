from sqlalchemy import Column, ForeignKey, Text
from sqlalchemy.orm import relationship

from .base import Base, TimestampMixin, UUIDBase


class AtaReuniao(UUIDBase, TimestampMixin, Base):
    __tablename__ = "atas"

    empresa_id = Column(ForeignKey("empresas.id"), nullable=False)
    periodo_id = Column(ForeignKey("periodos.id"), nullable=False)
    texto = Column(Text, nullable=True)

    participantes = relationship("ParticipanteReuniao", backref="ata")
