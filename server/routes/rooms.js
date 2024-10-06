var express = require('express');
var router = express.Router();
const cntrlMain=require('../controllers/rooms');

router.get('/',cntrlMain.rooms);

module.exports = router;
