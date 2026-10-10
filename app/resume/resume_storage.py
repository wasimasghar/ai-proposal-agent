from pathlib import Path

from app.resume.resume_models import Resume
from app.settings import get_settings


def _resume_file() -> Path:
    folder = get_settings().data_folder
    folder.mkdir(parents=True, exist_ok=True)
    return folder / "resume.json"


def save_resume(resume: Resume) -> None:
    _resume_file().write_text(resume.model_dump_json(indent=2))


def load_resume() -> Resume | None:
    path = _resume_file()
    if not path.exists():
        return None
    return Resume.model_validate_json(path.read_text())