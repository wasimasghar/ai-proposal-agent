import { useEffect, useRef, useState } from "react"
import { toast } from "sonner"
import { errorMessage } from "@/api/apiClient"
import { matchJob } from "@/api/matchApi"
import { writeProposal } from "@/api/proposalApi"
import { getResume, uploadResume } from "@/api/resumeApi"
import type { QuestionAnswer } from "@/components/agent/AgentQuestion"
import { MATCH_STEPS, PROPOSAL_STEPS } from "@/data/agentSteps"
import { MIN_JOB_LENGTH } from "@/data/limits"
import type { MatchReport } from "@/types/match"
import type { Proposal } from "@/types/proposal"
import type { Resume } from "@/types/resume"
import { useTimedSteps } from "./useTimedSteps"

export type WorkspaceStatus = "idle" | "matching" | "matched" | "writing" | "done" | "error"
export type ResumeStatus = "loading" | "uploading" | "ready" | "missing"

interface WorkspaceError {
  message: string
  failedStep: "match" | "proposal"
}

/** All workspace state and backend calls live here. Components only read from it. */
export function useAgentWorkspace() {
  const [resume, setResume] = useState<Resume | null>(null)
  const [resumeStatus, setResumeStatus] = useState<ResumeStatus>("loading")
  const resumeInputRef = useRef<HTMLInputElement>(null)

  const [draft, setDraft] = useState("")
  const [jobText, setJobText] = useState<string | null>(null)
  const [status, setStatus] = useState<WorkspaceStatus>("idle")
  const [matchReport, setMatchReport] = useState<MatchReport | null>(null)
  const [proposal, setProposal] = useState<Proposal | null>(null)
  const [answer, setAnswer] = useState<QuestionAnswer>(null)
  const [error, setError] = useState<WorkspaceError | null>(null)

  // Bumped on every new request and on Clear, so a late answer from an old request is ignored.
  const requestId = useRef(0)

  const isRunning = status === "matching" || status === "writing"
  const matchStep = useTimedSteps(status === "matching", MATCH_STEPS.length)
  const proposalStep = useTimedSteps(status === "writing", PROPOSAL_STEPS.length)

  // Load the saved resume when the workspace opens.
  useEffect(() => {
    let isActive = true
    getResume()
      .then((savedResume) => {
        if (!isActive) return
        setResume(savedResume)
        setResumeStatus(savedResume ? "ready" : "missing")
      })
      .catch((loadError) => {
        if (!isActive) return
        setResumeStatus("missing")
        toast.error(errorMessage(loadError))
      })
    return () => {
      isActive = false
    }
  }, [])

  function openResumePicker() {
    resumeInputRef.current?.click()
  }

  async function uploadResumeFile(file: File) {
    const hadResume = resume !== null
    setResumeStatus("uploading")
    try {
      const uploaded = await uploadResume(file)
      setResume(uploaded)
      setResumeStatus("ready")
      toast.success(`Resume ready: ${uploaded.name}`)
    } catch (uploadError) {
      setResumeStatus(hadResume ? "ready" : "missing")
      toast.error(errorMessage(uploadError))
    }
  }

  async function runMatch(jobDescription: string) {
    const id = ++requestId.current
    setStatus("matching")
    setError(null)
    setMatchReport(null)
    setProposal(null)
    setAnswer(null)
    try {
      const report = await matchJob(jobDescription)
      if (requestId.current !== id) return
      setMatchReport(report)
      setStatus("matched")
    } catch (matchError) {
      if (requestId.current !== id) return
      setError({ message: errorMessage(matchError), failedStep: "match" })
      setStatus("error")
    }
  }

  async function runProposal() {
    if (jobText === null || isRunning) return
    const id = ++requestId.current
    setAnswer("yes")
    setStatus("writing")
    setError(null)
    setProposal(null)
    try {
      const written = await writeProposal(jobText)
      if (requestId.current !== id) return
      setProposal(written)
      setStatus("done")
    } catch (proposalError) {
      if (requestId.current !== id) return
      setError({ message: errorMessage(proposalError), failedStep: "proposal" })
      setStatus("error")
    }
  }

  function sendJob() {
    const text = draft.trim()
    if (!text || isRunning) return
    if (text.length < MIN_JOB_LENGTH) {
      toast.error(`Paste the full job description (at least ${MIN_JOB_LENGTH} characters).`)
      return
    }

    if (resumeStatus === "loading" || resumeStatus === "uploading") {
      toast("Your resume is still loading, one moment...")
      return
    }
    if (!resume) {
      toast.error("Upload your resume first")
      openResumePicker() // still inside the click/keypress, so the browser allows it
      return
    }

    setDraft("")
    setJobText(text)
    void runMatch(text)
  }

  function stopHere() {
    setAnswer("no")
  }

  function retry() {
    if (!error || jobText === null) return
    if (error.failedStep === "match") void runMatch(jobText)
    else void runProposal()
  }

  /** Resets the conversation only. The uploaded resume stays. */
  function clear() {
    requestId.current++
    setDraft("")
    setJobText(null)
    setStatus("idle")
    setMatchReport(null)
    setProposal(null)
    setAnswer(null)
    setError(null)
    toast("Workspace cleared")
  }

  return {
    resume,
    resumeStatus,
    resumeInputRef,
    uploadResumeFile,
    draft,
    setDraft,
    jobText,
    status,
    isRunning,
    matchStep,
    proposalStep,
    matchReport,
    proposal,
    answer,
    error,
    sendJob,
    writeProposal: runProposal,
    stopHere,
    retry,
    clear,
  }
}
