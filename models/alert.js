
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AlertSchema = new Schema({
    location: { type: Schema.Types.ObjectId, ref: 'Location' },
    message: { type: String }
});

module.exports = mongoose.model('Alert', AlertSchema);