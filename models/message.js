const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    receiver: { type: Schema.Types.ObjectId, ref: 'User' },
    sender: { type: Schema.Types.ObjectId, ref: 'User' },
    location: { type: Schema.Types.ObjectId, ref: 'Location' },
    
});

module.exports = mongoose.model('Message', MessageSchema);