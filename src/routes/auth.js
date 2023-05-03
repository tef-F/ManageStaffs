const express = require('express');
const router = express.Router();
const authController = require('../app/controllers/AuthController');
const { auth, loginRedirect } = require('../app/middlewares/auth');

router.get('/login', loginRedirect, authController.index);
router.post('/login', authController.login);
router.post('/accept/:id', auth, authController.acceptUser);
router.delete('/accept/:id', auth, authController.declineUser);
router.post('/store-temp', authController.storeTemp);
router.get('/api/count-temp', authController.getCountTemp);
router.get('/logout/:token', authController.logout);
router.get('/register', authController.register);
router.post('/store', authController.store);
router.get('/forgot-password', authController.forgot);
router.get('/', auth, authController.index);

module.exports = router;
