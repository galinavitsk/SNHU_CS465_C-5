const Mongoose = require('./db');
const Trip = require('./travlr');
const Room = require('./room');

var fs = require('fs');
var trips = JSON.parse(fs.readFileSync('./data/trips.json', 'utf8'));
var rooms = JSON.parse(fs.readFileSync('./data/rooms.json', 'utf8'));

const seedDB = async () => {
    await Trip.deleteMany({});
    await Trip.insertMany(trips);
    await Room.deleteMany({});
    await Room.insertMany(rooms);
};
seedDB().then(async () => {
    await Mongoose.connection.close();
    process.exit(0);
})