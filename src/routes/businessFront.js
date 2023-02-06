const router = require('express').Router()

router.route('/').get((req, res) => {
  res.render(`${res.locals.language}/face`)
})

module.exports = router
