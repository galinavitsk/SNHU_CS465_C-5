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

const addTrip = async (req, res) => {
    console.log(req.body);
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
    const q=await newTrip.save();
    if(!q) {
        return res.status(404).json(err).send('No trip added');
    }
    return res.status(200).json(q);
};

const editTrip=async(req,res)=>{
    const trip = await Model.findOneAndUpdate({'code':req.params.tripCode},req.body).exec();
    if(!trip){
        return res.status(404).json(err).send('No trip found');
    }else{
        return res.status(201).json(trip);
    }
}

module.exports = { getTripsList, getTrip, addTrip,editTrip };
