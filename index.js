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
app.get('/api/scores', (req, res) => {
  db.read_scores((err, scores) => {
    if (!err) {
      res.send(scores)
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
  let data = [parseInt(req.body.studentid), parseInt(req.body.assignmentid), parseInt(req.body.score), req.body.subj]
  console.log(data);
  console.log(req.body);
  db.add_score(data, (err, score) => {
    if (!err) {
      res.status(200).send('Score Saved')
    } else {
      // console.log(err);
    }
  })
})
app.listen(port, console.log(`app listening on ${port}`))
