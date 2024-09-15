var express = require('express');
var router = express.Router();
const cntrlMain=require('../controllers/main');

router.get('/',cntrlMain.index);

module.exports = router;
