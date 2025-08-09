import uuid
from sqlalchemy import Column, DateTime, func
from sqlalchemy.orm import declared_attr

from ..db import Base

try:
    from sqlalchemy.dialects.postgresql import UUID as PGUUID

    UUIDType = PGUUID
    UUID_ARGS = {"as_uuid": True}
except Exception:  # pragma: no cover
    from sqlalchemy import String as UUIDType  # type: ignore

    UUID_ARGS = {}


class TimestampMixin:
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )


class UUIDBase:
    @declared_attr
    def id(cls):  # type: ignore
        return Column(UUIDType(**UUID_ARGS), primary_key=True, default=uuid.uuid4)
