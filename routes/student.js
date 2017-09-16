var express = require('express');
var api = require('../controllers/student');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('student',{ title: 'Student list'});
});
router.get('/api', api.list);
router.get('/api/details/:id', api.get);
router.post('/api', api.create);
router.put('/api', api.update);
router.delete('/api', api.delete);

module.exports = router;
