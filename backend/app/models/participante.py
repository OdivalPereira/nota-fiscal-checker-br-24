from sqlalchemy import Boolean, Column, ForeignKey, String

from .base import Base, TimestampMixin, UUIDBase


class ParticipanteReuniao(UUIDBase, TimestampMixin, Base):
    __tablename__ = "participantes"

    ata_id = Column(ForeignKey("atas.id"), nullable=False)
    nome = Column(String, nullable=False)
    cargo = Column(String, nullable=True)
    presente = Column(Boolean, default=True)
