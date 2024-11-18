const Mongoose = require('mongoose');
const Trip = require('../models/travlr');
const Model = Mongoose.model('trips');

//GET: /trips
const getTripsList = async (req, res) => {
    const trips = await Model.find().exec();
    if (!trips) {
        return res.status(404).json(err).send('No trips found');
    } else {
        return res.status(200).json(trips);
    }
};
const getTrip = async (req, res) => {
    try {

        const trips = await Model.find({ '_id': req.params.tripId }).exec();
        if (!trips) {
            return res.status(404).json(err).send('No trips found');
        } else {
            return res.status(200).json(trips);
        }
    } catch (error) {
        return res.status(404).json(err).send('Error occurred');
    }
};

const addTrip = async (req, res) => {
    const newTrip = new Trip({
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description
    })
    const q = await newTrip.save();
    if (!q) {
        return res.status(404).json(err).send('No trip added');
    }
    return res.status(200).json(q);
};

const editTrip = async (req, res) => {
    try {

        const trip = await Model.findOneAndUpdate({ '_id': req.params.tripId }, req.body).exec();
        if (!trip) {
            return res.status(404).json(err).send('No trip found');
        } else {
            return res.status(200).json(trip);
        }
    } catch (error) {
        return res.status(404).json(err).send('Error occurred');
    }
}

const deleteTrip = async (req, res) => {
    try {
        const trip = await Model.findOneAndDelete({ '_id': req.params.tripId }).exec();
        if (!trip) {
            return res.status(404).json(err).send('No trip found');
        } else {
            return res.status(200).json(trip);
        }
    } catch (error) {
        return res.status(404).json(err).send('Error occurred');
    }
}

module.exports = { getTripsList, getTrip, addTrip, editTrip, deleteTrip };
