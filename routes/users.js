const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');
/* GET users listing. */
router.get('/', userController.user_index);

module.exports = router;
