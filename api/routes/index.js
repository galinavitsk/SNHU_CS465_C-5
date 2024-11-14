const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const tripsController = require('../controllers/trips');
const authController = require('../controllers/authentication');
function authenticateJWT(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (authHeader == null) {
        return res.sendStatus(401);
    }

    let headers = authHeader.split(' ');
    if (headers.length < 1) {
        return res.sendStatus(501);
    }

    const token = authHeader.split(' ')[1];
    console.log(token);
    if (token == null) {
        return res.sendStatus(401);
    }
    const verified = jwt.verify(token, process.env.JWT_SECRET, (err,
        verified) => {
        if (err) {
            return res.sendStatus(401).json('Token Validation Error!');
        }
        req.auth = verified;
    });
    next();
}

router.route('/auth')
    .get(authenticateJWT, authController.checkValid);
router.route('/trips')
    .get(tripsController.getTripsList)
    .post(authenticateJWT, tripsController.addTrip);
router.route('/trips/:tripId')
    .get(tripsController.getTrip)
    .put(authenticateJWT, tripsController.editTrip);
router.route("/register")
    .post(authController.register);
router.route("/login")
    .post(authController.login);
module.exports = router;