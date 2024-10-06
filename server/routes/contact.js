var express = require('express');
var router = express.Router();
const cntrlMain=require('../controllers/contact');

router.get('/',cntrlMain.contact);

module.exports = router;
