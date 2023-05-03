const express = require('express');
const router = express.Router();
const PositionController = require('../app/controllers/PositionController');


router.get('/create', PositionController.create);
router.post('/store', PositionController.store);
router.get('/edit/:id', PositionController.edit);
router.put('/:id', PositionController.update);


module.exports = router;