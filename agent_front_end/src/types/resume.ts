export interface ResumeProject {
  name: string
  description: string
  tech_stack: string[]
}

export interface WorkExperience {
  company: string
  role: string
  duration: string
}

export interface Resume {
  name: string
  title: string
  years_experience: number
  skills: string[]
  projects: ResumeProject[]
  experience: WorkExperience[]
}
