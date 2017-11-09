const router = require('express').Router();
const User = require('../db/models/user');

// check currently-authenticated user, i.e. "who am I?"
router.get('/', function (req, res, next) {
  // with Passport:
  res.send(req.user);
});

// signup, i.e. "let `me` introduce myself"
router.post('/', function (req, res, next) {
  delete req.body.isAdmin;
  User.findOrCreate({
    where: req.body
  })
  .spread((user, created) => {
    if (created) {
      // with Passport:
      req.logIn(user, function (err) {
        if (err) return next(err);
        res.json(user);
      });
    } else {
      res.sendStatus(401); // this user already exists, you cannot sign up
    }
  });
});
// login, i.e. "you remember `me`, right?"
router.put('/', function (req, res, next) {
  User.findOne({
    where: {
      email: req.body.email + ''
    },
    atrributes: {
      include: ['password', 'salt']
    }
  })
  .then(user => {
    if (!user || !user.isValidPassword(req.body.password + '')) {
      res.sendStatus(401); // no message; good practice to omit why auth fails
    } else {
      // with Passport:
      req.logIn(user, function (err) {
        if (err) return next(err);
        res.json(user);
      });
    }
  })
  .catch(next);
});

// logout, i.e. "please just forget `me`"
router.delete('/', function (req, res, next) {
  // with Passport
  req.logOut();
  res.sendStatus(204);
});

module.exports = router;
