ALIASES = {
    "restfulapis": "restapi", "restapis": "restapi", "restfulapi": "restapi",
    "googlemapssdk": "googlemaps", "googlemapsapi": "googlemaps",
    "firebasefirestore": "firestore", "cloudfirestore": "firestore",
    "pushnotification": "pushnotifications",
    "swiftui": "swiftui",
}

# A specific skill also proves its bigger family: "Firestore" or "FCM" means you know "Firebase".
# Keys and values are normalized names. Any skill starting with "firebase" also counts as "firebase".
SKILL_FAMILIES = {
    "firestore": ["firebase"],
    "fcm": ["firebase", "pushnotifications"],
    "firebasecloudmessaging": ["firebase", "pushnotifications"],
    "crashlytics": ["firebase"],
    "remoteconfig": ["firebase"],
    "realtimedatabase": ["firebase"],
    "apns": ["pushnotifications"],
    "onesignal": ["pushnotifications"],
}

YEARS_FOR_FULL_SCORE = 3  # used when the job does not ask for a number of years


def _normalize(skill: str) -> str:
    """Make skills comparable: "REST API" -> "restapi", "RESTful APIs" -> "restapi"."""
    key = skill.lower().replace(" ", "").replace(".", "").replace("-", "")
    return ALIASES.get(key, key)


def _skills_with_families(skills: list[str]) -> set[str]:
    """Normalized skills plus the families they belong to: {"firestore"} -> {"firestore", "firebase"}."""
    have = set()
    for skill in skills:
        key = _normalize(skill)
        have.add(key)
        have.update(SKILL_FAMILIES.get(key, []))
        if key.startswith("firebase"):
            have.add("firebase")
    return have


def score_skills(resume_skills: list[str], required_skills: list[str]) -> tuple[int, list[str], list[str]]:
    """Return (score 0-100, matched skills, missing skills)."""
    if not required_skills:
        return 0, [], []  # nothing to compare with -> no credit

    have = _skills_with_families(resume_skills)  # resume ki skills ka set (tez search)
    matched = [s for s in required_skills if _normalize(s) in have]
    missing = [s for s in required_skills if _normalize(s) not in have]

    score = round(len(matched) / len(required_skills) * 100)
    return score, matched, missing


def score_experience(relevant_years: float, min_years: float) -> int:
    """Return 0-100 from years of related experience. Without a job requirement, 3 years is full marks."""
    if relevant_years <= 0:
        return 0
    needed = min_years if min_years > 0 else YEARS_FOR_FULL_SCORE
    return min(100, round(relevant_years / needed * 100))  # 2 of 4 years -> 50


def score_overall(skill: int, experience: int, project: int) -> int:
    """Weighted average: skills 60%, experience 20%, projects 20%."""
    return round(skill * 0.6 + experience * 0.2 + project * 0.2)
