const express = require('express');
const router = express.Router();
const users = require('../../controllers/users');

router.get('/:username',users.findUser);

module.exports = router;
