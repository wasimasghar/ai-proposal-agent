from functools import lru_cache

from google import genai

from app.settings import get_settings


@lru_cache
def get_client() -> genai.Client:
    """One Gemini client for the whole app."""
    return genai.Client(api_key=get_settings().gemini_api_key)