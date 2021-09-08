const express = require('express');
const router = express.Router();
const auth = require('../../controllers/auth');
const validateCheckToken = require('../../validate/checkToken.validate');

router.get('/',validateCheckToken.checkToken,auth.logout);

module.exports = router;
