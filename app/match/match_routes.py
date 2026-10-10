from fastapi import APIRouter, HTTPException

from app.job.job_length import check_job_length
from app.job.job_parser import parse_job
from app.match.match_models import MatchReport, MatchRequest
from app.match.project_ranking import rank_projects
from app.match.match_scoring import score_experience, score_overall, score_skills
from app.resume.resume_storage import load_resume

router = APIRouter(prefix="/match", tags=["match"])

NOT_A_JOB = "This doesn't look like a job description. Paste the full job post."


@router.post("", response_model=MatchReport)
def match(request: MatchRequest) -> MatchReport:
    check_job_length(request.job_description)
    resume = load_resume()
    if resume is None:
        raise HTTPException(status_code=400, detail="Upload your resume first.")

    job = parse_job(request.job_description)                      # Gemini call 1
    if not job.is_job_post:
        raise HTTPException(status_code=400, detail=NOT_A_JOB)

    # Written skills first. Only if the job lists none, use the skills guessed from the work.
    skills_needed = job.required_skills or job.nice_to_have_skills
    inferred = [] if skills_needed else job.inferred_skills
    skill, matched, missing = score_skills(resume.all_skills(), skills_needed or inferred)

    ranking = rank_projects(resume, job)                           # Gemini call 2
    experience = score_experience(ranking.relevant_years, job.min_years)
    project = ranking.projects[0].relevance if ranking.projects else 0

    return MatchReport(
        overall_match=score_overall(skill, experience, project),
        skill_match=skill,
        experience_match=experience,
        project_match=project,
        matched_skills=matched,
        missing_skills=missing,
        inferred_skills=inferred,
        relevant_years=ranking.relevant_years,
        relevant_projects=ranking.projects,
    )
