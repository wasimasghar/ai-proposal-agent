from pydantic import BaseModel


class JobPost(BaseModel):
    is_job_post: bool = True  # false when the text is not a job description at all
    title: str = ""
    required_skills: list[str] = []
    nice_to_have_skills: list[str] = []
    inferred_skills: list[str] = []  # only filled when the job names no skills
    min_years: float = 0
    summary: str = ""
