var express = require('express');
var router = express.Router();
const cntrlMain=require('../controllers/travel');

router.get('/',cntrlMain.travel);

module.exports = router;
