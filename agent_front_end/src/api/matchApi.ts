import type { MatchReport } from "@/types/match"
import { postJson } from "./apiClient"

export function matchJob(jobDescription: string): Promise<MatchReport> {
  return postJson<MatchReport>("/match", { job_description: jobDescription })
}
