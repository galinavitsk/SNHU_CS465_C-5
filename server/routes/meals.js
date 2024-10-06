var express = require('express');
var router = express.Router();
const cntrlMain=require('../controllers/meals');

router.get('/',cntrlMain.meals);

module.exports = router;
