from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.resume.resume_routes import router as resume_router
from app.match.match_routes import router as match_router
from app.proposal.proposal_routes import router as proposal_router
app = FastAPI(title="Proposal Agent API")

app.add_middleware(
    CORSMiddleware,
    allow_origin_regex=r"http://(localhost|127\.0\.0\.1)(:\d+)?",
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(resume_router) 
app.include_router(match_router)
app.include_router(proposal_router)
@app.get("/health")
def health() -> dict:
    return {"status": "ok"}