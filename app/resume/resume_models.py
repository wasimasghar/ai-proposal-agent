from pydantic import BaseModel


class Project(BaseModel):
    name: str
    description: str
    tech_stack: list[str] = []


class WorkExperience(BaseModel):
    company: str
    role: str
    duration: str = ""


class Resume(BaseModel):
    name: str
    title: str
    years_experience: float = 0
    skills: list[str] = []
    projects: list[Project] = []
    experience: list[WorkExperience] = []

    def all_skills(self) -> list[str]:
        """Skills list plus the tech used in projects (if you used it in a project, you have it)."""
        return self.skills + [tech for project in self.projects for tech in project.tech_stack]