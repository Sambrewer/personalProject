select students.name, students.email from students
join teachers on teachers.id = students.roomid
where teachers.id = $1;
