var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('student',{ title: 'Student list'});
});

module.exports = router;
