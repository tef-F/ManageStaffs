const express = require('express');
const router = express.Router();
const areaController = require('../app/controllers/AreaController');


router.get('/', areaController.index);

module.exports = router;