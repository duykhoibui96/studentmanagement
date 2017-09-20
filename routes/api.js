var express = require('express');
var studentApi = require('./api/student');
var router = express.Router();

router.use('/student',studentApi);

module.exports = router;