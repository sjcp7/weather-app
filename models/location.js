const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const LocationSchema = new Schema({
    latitude: { type: String },
    longitude: { type: String },
    cityname: { type: String },
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('Location', LocationSchema);