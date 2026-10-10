JOB_PROMPT = """Extract the requirements from this job description.
- is_job_post: true only if the text describes work someone wants done (a job, gig or project).
  false for greetings, questions, chat or meaningless text. When false, leave every other field empty.
- required_skills: technologies the client clearly needs (must-have).
- nice_to_have_skills: technologies mentioned as a plus or optional.
- inferred_skills: ONLY when the text names no skills at all, list the few core skills the work clearly needs
  (e.g. "an iPhone app for food delivery" -> "iOS", "Swift", "Google Maps"). Maximum 5.
  Leave it empty when any skill is written in the text.
- Write skills as short standard names (e.g. "Flutter", "Firebase", "REST API", "Swift").
- min_years: minimum years of experience asked for, as a number. 0 if not mentioned.
- summary: one or two sentences on what the client wants built.
- Use only what is written (or clearly needed, for inferred_skills). Never invent requirements."""
