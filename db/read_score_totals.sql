select round(avg(score.score)) as score, assignments.subject as subject from score
join assignments on assignments.id = score.assignid
where studentid = $1
group by assignments.subject
