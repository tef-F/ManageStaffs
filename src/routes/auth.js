const express = require('express');
const router = express.Router();
const authController = require('../app/controllers/AuthController');
const {
    auth,
    loginRedirect,
} = require('../app/middlewares/auth');

router.get('/login', loginRedirect, authController.index);
router.post('/login', authController.login);
router.get('/logout/:token', authController.logout);
router.get('/register', authController.register);
router.post('/store', authController.store);
router.get('/forgot-password', authController.forgot);
router.get('/', auth, authController.index);

module.exports = router;
