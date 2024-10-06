var express = require('express');
var router = express.Router();
const cntrlMain=require('../controllers/about');

router.get('/',cntrlMain.about);

module.exports = router;
