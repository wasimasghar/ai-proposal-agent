from functools import lru_cache
from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    gemini_api_key: str
    model_name: str = "gemini-3.5-flash-lite"
    data_folder: Path = Path("data")
    drafts_folder: Path = Path("drafts")
    max_upload_mb: int = 5
    min_job_chars: int = 200  # shorter job descriptions are rejected
    max_agent_steps: int = 8


@lru_cache
def get_settings() -> Settings:
    return Settings()