select score.studentid, score.score, score.subject, assignments.name from score
join assignments on assignments.id = score.assignid
