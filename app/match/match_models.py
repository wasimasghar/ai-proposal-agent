from pydantic import BaseModel


class ProjectMatch(BaseModel):
    name: str
    relevance: int  # 0-100
    reason: str


class ProjectRanking(BaseModel):
    projects: list[ProjectMatch] = []
    relevant_years: float = 0  # years of experience related to this job


class MatchReport(BaseModel):
    overall_match: int
    skill_match: int
    experience_match: int
    project_match: int
    matched_skills: list[str] = []
    missing_skills: list[str] = []
    inferred_skills: list[str] = []  # skills guessed from the work because the job listed none
    relevant_years: float = 0
    relevant_projects: list[ProjectMatch] = []


class MatchRequest(BaseModel):
    job_description: str
