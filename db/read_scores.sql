select score.studentid, score.score, assignments.subject, assignments.name from score
join assignments on assignments.id = score.assignid
join students on students.id = score.studentid
where score.studentid = $1
order by score.subject asc
