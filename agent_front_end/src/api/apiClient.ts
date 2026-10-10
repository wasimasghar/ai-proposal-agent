const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:4000").replace(/\/+$/, "")

const NETWORK_ERROR_MESSAGE = "Can't reach the server. Is the backend running on port 4000?"

/** Error from the backend. `status` is 0 when the server could not be reached at all. */
export class ApiError extends Error {
  status: number

  constructor(status: number, message: string) {
    super(message)
    this.name = "ApiError"
    this.status = status
  }
}

/** Turns any thrown value into a message we can show to the user. */
export function errorMessage(error: unknown): string {
  if (error instanceof Error && error.message) return error.message
  return "Something went wrong. Please try again."
}

async function readErrorMessage(response: Response): Promise<string> {
  try {
    const body = await response.json()
    if (typeof body?.detail === "string") return body.detail
    // FastAPI validation errors come as a list: [{ msg: "..." }]
    if (Array.isArray(body?.detail) && typeof body.detail[0]?.msg === "string") return body.detail[0].msg
  } catch {
    // body was not JSON
  }
  return `Request failed (${response.status})`
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  let response: Response
  try {
    response = await fetch(`${API_BASE_URL}${path}`, init)
  } catch {
    throw new ApiError(0, NETWORK_ERROR_MESSAGE)
  }

  if (!response.ok) {
    throw new ApiError(response.status, await readErrorMessage(response))
  }
  return (await response.json()) as T
}

export function getJson<T>(path: string): Promise<T> {
  return request<T>(path)
}

export function postJson<T>(path: string, body: unknown): Promise<T> {
  return request<T>(path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })
}

export function postFile<T>(path: string, file: File, fieldName = "file"): Promise<T> {
  const form = new FormData()
  form.append(fieldName, file)
  // No Content-Type header: the browser sets the multipart boundary itself.
  return request<T>(path, { method: "POST", body: form })
}
