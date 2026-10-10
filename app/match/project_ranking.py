from google.genai import types

from app.gemini_client import get_client
from app.job.job_models import JobPost
from app.match.match_models import ProjectRanking
from app.resume.resume_models import Resume
from app.settings import get_settings

RANK_PROMPT = """You compare a freelancer's resume with a job.
1. projects: rate EVERY project from 0 to 100 for how relevant it is to the job, with one short reason.
   - Consider both the tech stack AND the domain (e.g. a food delivery project is very relevant to a food delivery job, even with a different framework).
   - A project with no real connection to the job gets 0 to 10. Do not give middle scores just because you are unsure.
2. relevant_years: how many years of experience the freelancer has in the kind of work this job needs.
   Use the work history (roles and durations) and the projects. Count only related work. 0 if nothing is related.
- Use only the resume provided. Never invent projects or experience."""


def rank_projects(resume: Resume, job: JobPost, top: int = 3) -> ProjectRanking:
    """Rate the resume projects for this job (best first) and estimate the related years of experience."""
    if not resume.projects and not resume.experience:
        return ProjectRanking()

    prompt = (
        f"Job:\n{job.model_dump_json()}\n\n"
        f"Total years of experience: {resume.years_experience}\n"
        f"Work history:\n{[e.model_dump() for e in resume.experience]}\n\n"
        f"Projects:\n{[p.model_dump() for p in resume.projects]}"
    )
    response = get_client().models.generate_content(
        model=get_settings().model_name,
        contents=prompt,
        config=types.GenerateContentConfig(
            system_instruction=RANK_PROMPT,
            response_mime_type="application/json",
            response_schema=ProjectRanking,
            temperature=0.0,
        ),
    )
    ranking = ProjectRanking.model_validate_json(response.text)

    # guardrail: keep only projects that really exist in the resume
    real_names = {p.name for p in resume.projects}
    ranked = [p for p in ranking.projects if p.name in real_names]
    ranking.projects = sorted(ranked, key=lambda p: p.relevance, reverse=True)[:top]

    # guardrail: related years can't be negative or more than the total on the resume
    years = max(ranking.relevant_years, 0)
    if resume.years_experience > 0:
        years = min(years, resume.years_experience)
    ranking.relevant_years = years
    return ranking
