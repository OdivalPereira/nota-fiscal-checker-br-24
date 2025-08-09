from pydantic import BaseSettings, Field
from functools import lru_cache


class Settings(BaseSettings):
    database_url: str = Field(
        default="sqlite+aiosqlite:///./test.db", env="DATABASE_URL"
    )
    secret_key: str = Field(default="secret", env="SECRET_KEY")

    class Config:
        env_file = ".env"


@lru_cache()
def get_settings() -> Settings:
    return Settings()
