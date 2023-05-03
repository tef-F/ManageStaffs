const express = require('express');
const router = express.Router();
const meController = require('../app/controllers/MeController');
const {auth} = require('../app/middlewares/auth');


// router.use('/:slug', siteController.show);
router.use('/trash/blogs', meController.trashBlogs);
router.get('/stored/areas/:condition', meController.storedAreas);
router.use('/stored/blogs', meController.storedBlogs);
router.use('/stored/staffs',auth, meController.storedStaffs);
router.use('/stored/literacys',auth, meController.storedLiteracy);
router.use('/stored/positions',auth, meController.storedPosition);
router.get('/profile',auth, meController.profile);
router.get('/request',auth, meController.requestStaff);
router.post('/request',auth, meController.requestStaffAPI);
router.get('/',auth, meController.index);


module.exports = router;