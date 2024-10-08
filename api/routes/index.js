const express = require('express');
const router = express.Router();

const tripsController=require('../controllers/trips');
router.route('/trips')
    .get(tripsController.getTripsList)
    .post(tripsController.addTrip);
router.route('/trips/:tripCode')
    .get(tripsController.getTrip)
    .put(tripsController.editTrip);

module.exports = router;