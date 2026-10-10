from fastapi import HTTPException

from app.settings import get_settings


def check_job_length(description: str) -> None:
    """Reject job descriptions that are too short to judge (e.g. just "android developer")."""
    min_chars = get_settings().min_job_chars
    if len(description.strip()) < min_chars:
        raise HTTPException(
            status_code=400,
            detail=f"Job description is too short. Paste the full job post (at least {min_chars} characters).",
        )
