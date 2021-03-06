const express = require('express');
const router = express.Router();
const auth = require('../../controllers/auth');
const validateLogin = require('../../validate/auth/login.validate');

router.post('/',validateLogin.regexp,auth.login);

module.exports = router;
