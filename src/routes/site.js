const express = require('express');
const router = express.Router();
const siteController = require('../app/controllers/SiteController');
const authFunc = require('../app/middlewares/auth');


// router.use('/:slug', siteController.show);
router.use('/search', siteController.search);
router.get('/', siteController.index);


module.exports = router;