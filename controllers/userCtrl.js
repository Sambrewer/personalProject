const  app = require('../index.js')
    , db = app.get('db')
module.exports = {
  getUser: (req, res) => {
    let data = [req.body.username, req.body.password]
    db.read_user(data, (err, user) => {
      req.session.currentUser = user;
      console.log(req.session.currentUser[0]);
      res.send(user)
    })
  }
}
