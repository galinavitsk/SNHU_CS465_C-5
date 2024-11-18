const roomsEndpoint = 'http://localhost:3000/api/rooms';
const options = {
    method: 'GET',
    headers: { 'Accept': 'application/json' }
};
const rooms = async function (req, res) {
    await fetch(roomsEndpoint, options)
        .then(res => res.json())
        .then(data => {
            message = "";
            if (!(data instanceof Array)) {
                message = 'API lookup error';
                data = [];
            } else {
                if (!data.length) {
                    message = 'No trips exist in our database!';
                }
            }
            res.render('rooms', { title: "Rooms - Travlr Getaways", rooms: data, message: message })
        })
        .catch(err => res.status(500).send(err.message));
};

module.exports = { rooms }