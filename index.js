const express = require('express')
    , bodyParser = require('body-parser')
    , session = require('express-session')
    , cors = require('cors')
    , massive = require('massive')
    , axios = require('axios')
    , config = require('./config.js')
    // , babel = require('babel')

const port = 80;
const conn = massive.connectSync({
  connectionString: config.dbconn
})
const corsOptions = {
  origin: 'http://localhost:80'
}
const app = module.exports = express ();
app.set('db', conn)
const db = app.get('db')

app.use(cors(corsOptions));
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: config.sessionSecret
}));
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.json());
const parseString = require('xml2js').parseString
app.get('/api/users', (req, res) => {
  res.send(req.session.currentUser)
})
app.get('/api/students', (req, res) => {
  // console.log(req.session.currentUser);
  let userId = parseInt(req.session.currentUser[0].id);
  // console.log(userId);
  db.read_students([userId], (err, students) => {
    (!err)? res.send(students): res.send(err)
  })
})
app.get('/api/assignments', (req, res) => {
  let userId = parseInt(req.session.currentUser[0].id)
  db.read_assignments([userId], (err, assignments) => {
    res.send(assignments)
  })
})
app.get('/api/definition/:word', (req, res) => {
  let word = req.params.word
  axios.get(` http://www.dictionaryapi.com/api/v1/references/sd2/xml/${word}?key=7c4728c7-c3c9-47b6-9653-1166512168c5`).then((response) => {
    // console.log(typeof(response.data));
    parseString(response.data, (err, result) => {
      res.send(result)

    })
    // res.send(definition)
  })
})
app.get('/api/scores/:id', (req, res) => {
  let id = [parseInt(req.params.id)]
  db.read_scores(id, (err, scores) => {
    (!err)? res.send(scores):res.send(err);
  })
})

app.get('/test/:id', (req, res) => {
  let id = [parseInt(req.params.id)]
  db.read_score_totals(id, (err, totals) => {
    // console.log(totals);
    (!err)? res.send(totals):  res.send(err)
  })
})
app.get('/behaviour', (req, res) => {
  let id = parseInt(req.session.currentUser[0].id)
  db.read_behaviour([id], (err, behaviour) => {
    if (!err) {
      res.send(behaviour)
    } else {
      res.send(err)
    }
  })
})
app.get(`/api/lesson`, (req, res) => {
  let id = parseInt(req.session.currentUser[0].id)
  db.read_lesson([id], (err, lesson) => {
    (!err)?  res.send(lesson):  console.log(err)
  })
})
app.post('/api/users', (req, res) => {
  console.log(req);
  let data = [req.body.username, req.body.password]
  db.read_user(data, (err, user) => {
    req.session.currentUser = user;
    console.log(err);
    res.send(user)
  })
})
app.post('/api/assignments', (req, res) => {
  let data = [req.body.subj, req.body.type, parseInt(req.session.currentUser[0].id), req.body.name];
  db.add_assignment(data, (err, assignments) => {
    if (!err) {
      res.status(200).send('Saved Successfully')
    } else {
      // console.log(err);
      res.send('error')
    }
  })
})
app.post('/api/scores', (req, res) => {
  let data = [parseInt(req.body.studentid), parseInt(req.body.assignmentid), parseInt(req.body.score)]
  console.log(data, 'add score');
  console.log(req.body);
  db.add_score(data, (err, score) => {
    if (!err) {
      res.status(200).send('Score Saved')
    } else {
      console.log(err, 'add score error');
    }
  })
})
app.post(`/api/lesson`, (req, res) => {
  let data = [req.body.name, req.body.activity, req.body.info, req.body.objective, req.body.requiredMats, req.body.verification, req.body.misc, req.body.timeStart, req.body.timeEnd, parseInt(req.session.currentUser[0].id), req.body.date, req.body.subject, req.body.vocabulary]
  console.log(data, req.body);
  db.add_lesson(data, (err, lesson) => {
    if (!err) {
      res.send('Lesson Added')
    } else {
      console.log(err);
      res.send(err);
    }
  })
})
app.post(`/api/students`, (req, res) => {
  let data = [req.body.name, req.body.guardian, req.body.email, parseInt(req.session.currentUser[0].id)]
  db.add_student(data, (err, student) => {
    (!err)?res.send('Student Added'):res.send(err)
  })
})
app.post(`/api/teachers`, (req, res) => {
  let data = [req.body.name, req.body.username, req.body.password, req.body.imgurl]
  db.add_teacher(data, (err, teacher) => {
    (!err)?res.send('User Created'):res.send(err)
  })
})
app.put('/api/behave', (req, res) => {
  let data = [parseInt(req.body.id), parseInt(req.body.behaveid)]
  db.update_behaviour(data, (err, behaves) => {
    if (!err) {
      res.send('Moved')
    } else {
      console.log(err);
      res.send(err)
    }
  })
})
app.put(`/api/lesson/:id/objective`, (req, res) => {
  let data = [req.body.objective, parseInt(req.params.id)]
  console.log(req.params.id);
  console.log(data);
  db.update_lesson_objective(data, (err, lesson) => {
    (!err)?res.send(`Update Successful`):res.send(err)
  })
})
app.put(`/api/lesson/:id/verification`, (req, res) => {
  let data = [req.body.verification, parseInt(req.params.id)]
  db.update_lesson_verification(data, (err, ver) => {
    (!err)?res.send(`Update Successful`):res.send(err)
  })
})
app.put(`/api/lesson/:id/information`, (req, res) => {
  let data = [req.body.information, parseInt(req.params.id)]
  db.update_lesson_information(data, (err, info) => {
    (!err)?res.send(`Update Successful`):res.send(err)
  })
})
app.put(`/api/lesson/:id/activity`, (req, res) => {
  let data = [req.body.activity, parseInt(req.params.id)]
  db.update_lesson_activity(data, (err, act) => {
    (!err)?res.send(`Update Successful`):res.send(err)
  })
})
app.put(`/api/lesson/:id/materials`, (req, res) => {
  let data = [req.body.materials, parseInt(req.params.id)]
  db.update_lesson_materials(data, (err, mats) => {
    (!err)?res.send(`Update Successful`):res.send(err)
  })
})
app.put(`/api/lesson/:id/other`, (req, res) => {
  let data = [req.body.other, parseInt(req.params.id)]
  db.update_lesson_other(data, (err, misc) => {
    (!err)?res.send(`Update Successful`):res.send(err)
  })
})
app.delete('/api/assignment/:id', (req, res) => {
  let id = parseInt(req.params.id)
  // console.log(id);
  db.remove_assignment([id], (err, assign) => {
    if (!err) {
      res.send('Assignment Removed')
    } else {
      // console.log(err);
      res.send(err)
    }
  })
})
app.delete('/api/lesson/:id', (req, res) => {
  let id = parseInt(req.params.id)
  db.remove_lesson([id], (err, less) => {
    (!err)? res.send('Lesson Plan Deleted') : res.send(err)
  })
})
app.delete(`/api/student/:id`, (req, res) => {
  let id = [parseInt(req.params.id)]
  db.remove_student(id, (err, stud) => {
    (!err)? res.send('Student Removed') : res.sed(err)
  })
})
app.listen(port, console.log(`app listening on ${port}`))
