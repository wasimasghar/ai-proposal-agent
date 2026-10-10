from fastapi import APIRouter, File, HTTPException, UploadFile

from app.resume.resume_parser import parse_resume
from app.resume.resume_models import Resume
from app.resume.pdf_text import read_pdf_text
from app.resume.resume_storage import load_resume, save_resume
from app.settings import get_settings

router = APIRouter(prefix="/resume", tags=["resume"])


@router.post("", response_model=Resume)
def upload_resume(file: UploadFile = File(...)) -> Resume:
    settings = get_settings()
    if not (file.filename or "").lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are allowed.")

    data = file.file.read()
    if len(data) > settings.max_upload_mb * 1024 * 1024:
        raise HTTPException(status_code=400, detail=f"PDF must be under {settings.max_upload_mb} MB.")

    text = read_pdf_text(data)
    if not text:
        raise HTTPException(status_code=400, detail="No text found in this PDF (it may be scanned).")

    resume = parse_resume(text)
    save_resume(resume)
    return resume


@router.get("", response_model=Resume)
def get_resume() -> Resume:
    resume = load_resume()
    if resume is None:
        raise HTTPException(status_code=404, detail="No resume uploaded yet.")
    return resume