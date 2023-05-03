const express = require('express');
const router = express.Router();
const LiteracyController = require('../app/controllers/LiteracyController');



router.get('/edit/:id', LiteracyController.edit);
router.put('/:id', LiteracyController.update);


module.exports = router;