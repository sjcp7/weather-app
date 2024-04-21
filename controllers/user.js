const User = require('../models/user');
const asyncHandler = require('express-async-handler');

// list all users
exports.user_index = asyncHandler(async (req, res, next) => {
    res.send('Not implemented: User#index');
});