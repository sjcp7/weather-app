const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: String },
    password: { type: String },
    location: { type: Schema.Types.ObjectId, ref: 'Location' },
    inbox: { type: Schema.Types.ObjectId, ref: 'Inbox' }
});

module.exports = mongoose.model('User', UserSchema);