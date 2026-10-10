from fastapi import APIRouter, HTTPException

from app.job.job_length import check_job_length
from app.proposal.proposal_agent import write_proposal
from app.proposal.proposal_models import Proposal, ProposalRequest
from app.resume.resume_storage import load_resume

router = APIRouter(prefix="/proposal", tags=["proposal"])


@router.post("", response_model=Proposal)
def create_proposal(request: ProposalRequest) -> Proposal:
    check_job_length(request.job_description)
    if load_resume() is None:
        raise HTTPException(status_code=400, detail="Upload your resume first.")
    try:
        return write_proposal(request.job_description)
    except Exception as error:
        raise HTTPException(status_code=500, detail=str(error))