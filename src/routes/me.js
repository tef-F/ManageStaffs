const express = require('express');
const router = express.Router();
const meController = require('../app/controllers/MeController');
const {auth} = require('../app/middlewares/auth');


// router.use('/:slug', siteController.show);
router.use('/trash/blogs', meController.trashBlogs);
router.use('/stored/blogs', meController.storedBlogs);
router.use('/stored/staffs',auth, meController.storedStaffs);
router.use('/',auth, meController.index);


module.exports = router;