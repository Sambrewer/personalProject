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

app.post('/api/users', (req, res) => {
  let data = [req.body.username, req.body.password]
  db.read_user(data, (err, user) => {
    req.session.currentUser = user;
    // console.log(req.session.currentUser);
    res.send(user)
  })
})
app.get('/api/users', (req, res) => {
  res.send(req.session.currentUser)
})
app.get('/api/students', (req, res) => {
  console.log(req.session.currentUser);
  let userId = parseInt(req.session.currentUser[0].id);
  console.log(userId);
  db.read_students([userId], (err, students) => {
    if (!err) {
      res.send(students)
    }
  })
})
app.post('/api/assignments', (req, res) => {
  let data = [req.body.subj, req.body.type];
  db.add_assignment(data, (err, assignments) => {
    if (!err) {
      res.status(200).send('Saved Successfully')
    }
  })
})
app.listen(port, console.log(`app listening on ${port}`))
