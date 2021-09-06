const express = require('express');
const router = express.Router();
const auth = require('../../controllers/auth');
const validateRegister = require('../../validate/register.validate');

router.post('/',validateRegister.regexp,validateRegister.checkUser,auth.register);

module.exports = router;
