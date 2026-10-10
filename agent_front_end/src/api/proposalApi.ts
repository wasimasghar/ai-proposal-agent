import type { Proposal } from "@/types/proposal"
import { postJson } from "./apiClient"

/** The agent runs several model calls, so this can take 20-60 seconds. */
export function writeProposal(jobDescription: string): Promise<Proposal> {
  return postJson<Proposal>("/proposal", { job_description: jobDescription })
}
