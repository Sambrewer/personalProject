select subject, round(avg(score)) as score from score
where studentid = $1
group by subject
