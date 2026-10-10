export interface RelevantProject {
  name: string
  relevance: number
  reason: string
}

export interface MatchReport {
  overall_match: number
  skill_match: number
  experience_match: number
  project_match: number
  matched_skills: string[]
  missing_skills: string[]
  /** Skills guessed from the work because the job listed none. Empty when the job listed skills. */
  inferred_skills: string[]
  /** Years of experience related to this job. */
  relevant_years: number
  relevant_projects: RelevantProject[]
}
