from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .db import Base, engine
from .routers import empresas, demonstrativo, valores, nfe, dp

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Trimestral Insight Hub API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(empresas.router, prefix="/api/v1")
app.include_router(valores.router, prefix="/api/v1")
app.include_router(demonstrativo.router, prefix="/api/v1")
app.include_router(nfe.router, prefix="/api/v1")
app.include_router(dp.router, prefix="/api/v1")


@app.get("/")
def read_root():
    return {"status": "ok"}
