from google.genai import types

from app.gemini_client import get_client
from app.job.job_models import JobPost
from app.job.job_prompt import JOB_PROMPT
from app.settings import get_settings


def parse_job(description: str) -> JobPost:
    """Turn a job description into a JobPost object."""
    response = get_client().models.generate_content(
        model=get_settings().model_name,
        contents=description,
        config=types.GenerateContentConfig(
            system_instruction=JOB_PROMPT,
            response_mime_type="application/json",
            response_schema=JobPost,
            temperature=0.0,
        ),
    )
    return JobPost.model_validate_json(response.text)