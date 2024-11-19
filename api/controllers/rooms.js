const Mongoose = require('mongoose');
const Room = require('../models/room');
const Model = Mongoose.model('rooms');

//GET: /rooms
const getRoomsList = async (req, res) => {
    const rooms = await Model.find().exec();
    if (!rooms) {
        return res.status(404).json(err).send('No rooms found');
    } else {
        return res.status(200).json(rooms);
    }
};
const getRoom = async (req, res) => {
    try {
        const rooms = await Model.find({ '_id': req.params.roomId }).exec();
        if (!rooms) {
            return res.status(404).json(err).send('No rooms found');
        } else {
            return res.status(200).json(rooms);
        }
    } catch (error) {
        return res.status(404).json(err).send('Error occured');
    }
};

const addRoom = async (req, res) => {
    const newRoom = new Room({
        code: req.body.code,
        name: req.body.name,
        rate: req.body.rate,
        capacity: req.body.capacity,
        image: req.body.image,
        description: req.body.description
    })
    const q = await newRoom.save();
    if (!q) {
        return res.status(404).json(err).send('No room added');
    }
    return res.status(200).json(q);
};

const editRoom = async (req, res) => {
    try {

        const room = await Model.findOneAndUpdate({ '_id': req.params.roomId }, req.body).exec();
        if (!room) {
            return res.status(404).json(err).send('No room found');
        } else {
            return res.status(200).json(room);
        }
    } catch (error) {
        return res.status(404).json(err).send('Error occurred');
    }
}

const deleteRoom = async (req, res) => {
    try {
        const room = await Model.findOneAndDelete({ '_id': req.params.roomId }).exec();
        if (!room) {
            return res.status(404).json(err).send('No room found');
        } else {
            return res.status(200).json(room);
        }
    } catch (error) {
        return res.status(404).json(err).send('Error occurred');
    }
}

module.exports = { getRoomsList, getRoom, addRoom, editRoom, deleteRoom };
