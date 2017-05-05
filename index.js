const express = require('express')
    , bodyParser = require('body-parser')
    , session = require('express-session')
    , cors = require('cors')
    , massive = require('massive')
    , config = require('./config.js')
    // , babel = require('babel')

const port = 3000;
const conn = massive.connectSync({
  connectionString: "postgres://postgres:Blink-182@localhost/personalproj"
})
const corsOptions = {
  origin: 'http://localhost:3000'
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

app.get('/api/users', (req, res) => {
  res.send(req.session.currentUser)
})
app.get('/api/students', (req, res) => {
  // console.log(req.session.currentUser);
  let userId = parseInt(req.session.currentUser[0].id);
  // console.log(userId);
  db.read_students([userId], (err, students) => {
    if (!err) {
      res.send(students)
    }
  })
})
app.get('/api/assignments', (req, res) => {
  let userId = parseInt(req.session.currentUser[0].id)
  db.read_assignments([userId], (err, assignments) => {
    res.send(assignments)
  })
})
app.get('/api/scores/:id', (req, res) => {
  let id = [parseInt(req.params.id)]
  console.log(req.params.id);
  db.read_scores(id, (err, scores) => {
    if (!err) {
      res.send(scores)
    } else {
      console.log(err);
    }
  })
})

app.get('/test/:id', (req, res) => {
  console.log('hello');
  let id = [parseInt(req.params.id)]
  db.read_score_totals(id, (err, totals) => {
    // console.log(totals);
    if (!err) {
      res.send(totals)
      console.log(totals);
    } else {
      console.log(err);
      res.send(err)
    }
  })
})
app.get('/behaviour', (req, res) => {
  let id = parseInt(req.session.currentUser[0].id)
  db.read_behaviour([id], (err, behaviour) => {
    if (!err) {
      res.send(behaviour)
    } else {
      console.log(err);
      res.send(err)
    }
  })
})
app.get(`/api/lesson`, (req, res) => {
  let id = parseInt(req.session.currentUser[0].id)
  db.read_lesson([id], (err, lesson) => {
    if (!err) {
      res.send(lesson)
    } else {
      res.send(err)
    }
  })
})
app.post('/api/users', (req, res) => {
  let data = [req.body.username, req.body.password]
  db.read_user(data, (err, user) => {
    req.session.currentUser = user;
    // console.log(req.session.currentUser);
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
  // console.log(data);
  // console.log(req.body);
  db.add_score(data, (err, score) => {
    if (!err) {
      res.status(200).send('Score Saved')
    } else {
      // console.log(err);
    }
  })
})
app.post(`/api/lesson`, (req, res) => {
  let data = [req.body.name, req.body.activity, req.body.info, req.body.objective, req.body.requiredMats, req.body.verification, req.body.misc]
  db.add_lesson(data, (err, lesson) => {
    if (!err) {
      res.send('Lesson Added')
    } else {
      res.send(err);
    }
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
app.listen(port, console.log(`app listening on ${port}`))
