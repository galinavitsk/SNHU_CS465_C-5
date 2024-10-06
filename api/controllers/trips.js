const Mongoose = require('mongoose');
const Trip=require('../models/travlr');
const Model = Mongoose.model('trips');

//GET: /trips
const getTripsList = async (req, res) => {
    const trips = await Model.find().exec();
if(!trips){
    return res.status(404).json(err).send('No trips found');
}else{
    return res.status(200).json(trips);
}};
const getTrip = async (req, res) => {
    const trips = await Model.find({'code':req.params.tripCode}).exec();
if(!trips){
    return res.status(404).json(err).send('No trips found');
}else{
    return res.status(200).json(trips);
}};

module.exports = { getTripsList, getTrip };
