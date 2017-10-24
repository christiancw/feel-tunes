const router = require('express').Router();
// const User = require('../db').model('user');
const models = require('../db');
const User = models.User;
module.exports = router;

router.get('/', (req, res, next) => {
  User.findAll()
    .then(users => res.json(users))
    .catch(next);
});
