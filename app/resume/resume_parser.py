from google.genai import types

from app.gemini_client import get_client
from app.resume.resume_models import Resume
from app.resume.resume_prompt import RESUME_PROMPT
from app.settings import get_settings


def parse_resume(text: str) -> Resume:
    """Turn resume text into a Resume object."""
    response = get_client().models.generate_content(
        model=get_settings().model_name,
        contents=text,
        config=types.GenerateContentConfig(
            system_instruction=RESUME_PROMPT,
            response_mime_type="application/json",
            response_schema=Resume,
            temperature=0.0,
        ),
    )
    return Resume.model_validate_json(response.text)