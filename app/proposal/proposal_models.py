from pydantic import BaseModel


class ProposalRequest(BaseModel):
    job_description: str


class Proposal(BaseModel):
    text: str
    word_count: int
    steps: list[str] = []  # tools the agent called, in order
    draft_file: str = ""