const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const InboxSchema = new Schema({
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    alerts: [ { type: Schema.Types.ObjectId, ref: 'Alert' }],
    messages: [ { type: Schema.Types.ObjectId, ref: 'Message' }]
});

module.exports = mongoose.model('Inbox', InboxSchema);