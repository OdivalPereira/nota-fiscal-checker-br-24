from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool
import pytest
from uuid import uuid4

from app.main import app
from app.db import Base, get_session
from app.models.empresa import Empresa

# Setup in-memory SQLite database for testing
SQLALCHEMY_DATABASE_URL = "sqlite:///:memory:"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def override_get_session():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()

app.dependency_overrides[get_session] = override_get_session

client = TestClient(app)

@pytest.fixture(scope="module")
def test_db():
    Base.metadata.create_all(bind=engine)
    db = TestingSessionLocal()
    
    # Create a test company
    empresa = Empresa(id=uuid4(), nome="Empresa Teste", cnpj="00000000000191")
    db.add(empresa)
    db.commit()
    db.refresh(empresa)
    
    yield db
    
    db.close()
    Base.metadata.drop_all(bind=engine)

def test_create_nfe(test_db):
    empresa = test_db.query(Empresa).first()
    response = client.post(
        "/api/v1/nfe/",
        json={
            "numero": "123",
            "chave": "12345678901234567890123456789012345678901234",
            "valor": 1000.0,
            "status": "AUTORIZADA",
            "emitente": "Empresa Teste",
            "destinatario": "Cliente Teste",
            "empresa_id": str(empresa.id)
        },
    )
    assert response.status_code == 201
    data = response.json()
    assert data["numero"] == "123"
    assert data["status"] == "AUTORIZADA"

def test_read_nfes(test_db):
    response = client.get("/api/v1/nfe/")
    assert response.status_code == 200
    data = response.json()
    assert len(data) >= 1

def test_dashboard_stats(test_db):
    response = client.get("/api/v1/nfe/dashboard")
    assert response.status_code == 200
    data = response.json()
    assert data["total_autorizadas"] >= 1
    assert data["valor_total_autorizadas"] >= 1000.0
