const mongoose = require('mongoose');

// Define the trip schema
const roomSchema = new mongoose.Schema({
    code: { type: String, required: true, index: true },
    name: { type: String, required: true, index: true },
    rate: { type: Number, required: true },
    image: { type: String, required: true },
    capacity: { type: Number, required: true },
    description: { type: [String], required: true }
});
const Room = mongoose.model('rooms', roomSchema);
module.exports = Room;