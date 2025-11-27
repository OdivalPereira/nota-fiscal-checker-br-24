from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import List
from uuid import UUID

from ..db import get_session
from ..models.nfe import NFe, NFeStatus
from ..schemas.nfe import NFeCreate, NFeResponse, NFeUpdate, NFeDashboardStats

router = APIRouter(
    prefix="/nfe",
    tags=["nfe"],
)

@router.post("/", response_model=NFeResponse, status_code=status.HTTP_201_CREATED)
def create_nfe(nfe: NFeCreate, db: Session = Depends(get_session)):
    db_nfe = NFe(**nfe.dict())
    db.add(db_nfe)
    db.commit()
    db.refresh(db_nfe)
    return db_nfe

@router.get("/", response_model=List[NFeResponse])
def read_nfes(skip: int = 0, limit: int = 100, db: Session = Depends(get_session)):
    nfes = db.query(NFe).offset(skip).limit(limit).all()
    return nfes

@router.get("/dashboard", response_model=NFeDashboardStats)
def get_dashboard_stats(db: Session = Depends(get_session)):
    total_autorizadas = db.query(NFe).filter(NFe.status == NFeStatus.AUTORIZADA.value).count()
    total_canceladas = db.query(NFe).filter(NFe.status == NFeStatus.CANCELADA.value).count()
    total_denegadas = db.query(NFe).filter(NFe.status == NFeStatus.DENEGADA.value).count()
    total_pendentes = db.query(NFe).filter(NFe.status == NFeStatus.PENDENTE.value).count()
    
    valor_total_autorizadas = db.query(func.sum(NFe.valor)).filter(NFe.status == NFeStatus.AUTORIZADA.value).scalar() or 0.0
    
    return NFeDashboardStats(
        total_autorizadas=total_autorizadas,
        total_canceladas=total_canceladas,
        total_denegadas=total_denegadas,
        total_pendentes=total_pendentes,
        valor_total_autorizadas=valor_total_autorizadas
    )

@router.get("/{nfe_id}", response_model=NFeResponse)
def read_nfe(nfe_id: UUID, db: Session = Depends(get_session)):
    nfe = db.query(NFe).filter(NFe.id == nfe_id).first()
    if nfe is None:
        raise HTTPException(status_code=404, detail="NFe not found")
    return nfe

@router.put("/{nfe_id}", response_model=NFeResponse)
def update_nfe(nfe_id: UUID, nfe_update: NFeUpdate, db: Session = Depends(get_session)):
    db_nfe = db.query(NFe).filter(NFe.id == nfe_id).first()
    if db_nfe is None:
        raise HTTPException(status_code=404, detail="NFe not found")
    
    update_data = nfe_update.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_nfe, key, value)
    
    db.add(db_nfe)
    db.commit()
    db.refresh(db_nfe)
    return db_nfe

@router.delete("/{nfe_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_nfe(nfe_id: UUID, db: Session = Depends(get_session)):
    db_nfe = db.query(NFe).filter(NFe.id == nfe_id).first()
    if db_nfe is None:
        raise HTTPException(status_code=404, detail="NFe not found")
    
    db.delete(db_nfe)
    db.commit()
    return None
