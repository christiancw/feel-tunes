const router = require('express').Router();
module.exports = router;

router.use('/users', require('./users'));
router.use('/playlist', require('./playlist'));
router.use('/tones', require('./tones'));
// router.use('/auth', require('./auth'));

router.use((req, res) => {
  res.status(404).send('Not found');
});
