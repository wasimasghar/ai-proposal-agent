from datetime import datetime

from app.job.job_models import JobPost
from app.match.project_ranking import rank_projects
from app.match.match_scoring import score_skills
from app.resume.resume_storage import load_resume
from app.settings import get_settings


def get_resume() -> dict:
    """Get the freelancer's resume: name, title, years of experience, skills, projects and work history."""
    resume = load_resume()
    return resume.model_dump() if resume else {"error": "No resume uploaded."}


def check_skills(required_skills: list[str]) -> dict:
    """Compare the job's required skills with the freelancer's skills. Returns score (0-100), matched and missing skills."""
    resume = load_resume()
    if resume is None:
        return {"error": "No resume uploaded."}
    score, matched, missing = score_skills(resume.all_skills(), required_skills)
    return {"score": score, "matched": matched, "missing": missing}


def find_projects(job_title: str, job_summary: str, required_skills: list[str]) -> dict:
    """Find the freelancer's projects most relevant to this job, with a relevance score and reason for each."""
    resume = load_resume()
    if resume is None:
        return {"error": "No resume uploaded."}
    job = JobPost(title=job_title, summary=job_summary, required_skills=required_skills)
    return {"projects": [p.model_dump() for p in rank_projects(resume, job).projects]}


def count_words(text: str) -> dict:
    """Count the words in a proposal draft. A good Upwork proposal is 120 to 220 words."""
    return {"word_count": len(text.split())}


def save_draft(text: str) -> dict:
    """Save the final proposal to a file. Call this once, only when the proposal is finished."""
    folder = get_settings().drafts_folder
    folder.mkdir(parents=True, exist_ok=True)
    path = folder / f"proposal_{datetime.now():%Y%m%d_%H%M%S}.md"
    path.write_text(text)
    return {"saved_to": str(path)}


ALL_TOOLS = [get_resume, check_skills, find_projects, count_words, save_draft]
TOOLS_BY_NAME = {tool.__name__: tool for tool in ALL_TOOLS}