var express = require('express');
var router = express.Router();
var Dao = require('../modjs/dao.js');
const dao = new Dao();

router.get('/report', function (req, res, next) {
  dao.save(req.query.message);
  res.send('');
});

module.exports = router;