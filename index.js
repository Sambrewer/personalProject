const express = require('express')
    , bodyParser = require('body-parser')
    , session = require('express-session')
    , cors = require('cors')
    , massive = require('massive')
    , config = require('./config.js')
    // , babel = require('babel')

const port = 3000;
const conn = massive.connectSync({
  connectionString: "postgres://postgres:@localhost/personalproj"
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
    console.log(user);
    res.send(user)
  })
})
app.listen(port, console.log('app is listening on', port))
