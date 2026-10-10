const TOOL_LABELS: Record<string, string> = {
  get_resume: "Read your resume",
  check_skills: "Checked your skills",
  find_projects: "Picked your best projects",
  count_words: "Checked the length",
  save_draft: "Saved the draft",
}

/** Friendly label for a tool name the agent used. Unknown names are shown as they are. */
export function toolLabel(toolName: string): string {
  return TOOL_LABELS[toolName] ?? toolName
}
