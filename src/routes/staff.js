const express = require('express');
const router = express.Router();
const staffsController = require('../app/controllers/StaffsController');

router.get('/create-position', staffsController.createPosition);
router.get('/create', staffsController.create);
router.post('/store', staffsController.store);
router.get('/show', staffsController.showPosition);
router.get('/', staffsController.index);

module.exports = router;
