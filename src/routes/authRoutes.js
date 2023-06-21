const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validateUser, validate } = require('../middleware/validator');
const { authenticate } = require('../middleware/authenticator');

router.post('/register', validateUser(), validate, authController.register);
router.post('/login', authController.login);
router.get('/me', authenticate, authController.me);

module.exports = router;