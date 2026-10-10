import type { Resume } from "@/types/resume"
import { ApiError, getJson, postFile } from "./apiClient"

/** Returns the saved resume, or null when none has been uploaded yet (404). */
export async function getResume(): Promise<Resume | null> {
  try {
    return await getJson<Resume>("/resume")
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) return null
    throw error
  }
}

export function uploadResume(file: File): Promise<Resume> {
  return postFile<Resume>("/resume", file)
}
