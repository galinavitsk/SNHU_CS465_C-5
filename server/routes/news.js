var express = require('express');
var router = express.Router();
const cntrlMain=require('../controllers/news');

router.get('/',cntrlMain.news);

module.exports = router;
