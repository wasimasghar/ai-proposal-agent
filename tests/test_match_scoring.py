from app.match.match_scoring import score_experience, score_overall, score_skills

score, matched, missing = score_skills(["Flutter", "Firebase", "Dart"], ["Flutter", "Firebase", "REST API"])
assert score == 67, score
assert matched == ["Flutter", "Firebase"], matched
assert missing == ["REST API"], missing

assert score_skills(["Flutter"], []) == (0, [], [])  # job lists no skills -> no credit
assert score_skills(["Flutter"], ["Flutter"]) == (100, ["Flutter"], [])  # one skill, matched -> 100
assert score_skills(["Node JS"], ["node.js"])[0] == 100

assert score_experience(5, 3) == 100
assert score_experience(2, 4) == 50
assert score_experience(1, 0) == 33  # no requirement: 3 related years = full marks
assert score_experience(3, 0) == 100
assert score_experience(0, 0) == 0  # no related experience
assert score_experience(0, 2) == 0
assert score_experience(8, 2) == 100

assert score_overall(75, 100, 80) == 81
assert score_skills(["RESTful APIs", "Google Maps SDK"], ["REST API", "Google Maps"])[0] == 100

# skill families: Firestore / FCM on the resume count as Firebase and push notifications
resume = ["Flutter", "Firebase Authentication", "Firestore", "FCM", "Google Maps SDK"]
score, matched, missing = score_skills(resume, ["Flutter", "Firebase", "Google Maps", "Push notifications", "Stripe"])
assert matched == ["Flutter", "Firebase", "Google Maps", "Push notifications"], matched
assert missing == ["Stripe"], missing
assert score_skills(["Firebase Storage"], ["Firebase"])[0] == 100  # any "Firebase ..." skill counts
assert score_skills(["Firebase"], ["Firestore"])[0] == 0  # only child -> parent, not the other way

print("All score tests passed")