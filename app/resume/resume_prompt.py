RESUME_PROMPT = """Extract the person's profile from this resume.
- Use only what is written. Never invent anything.
- skills: every language, framework, tool and platform, as short names (e.g. "Flutter", "Firebase", "Swift"). List each skill separately: never combine skills with "/" or "and".- years_experience: total professional years as a number. Estimate from job dates if not stated, 0 if unknown.
- projects: named projects and notable products from jobs, each with a short description and tech stack."""