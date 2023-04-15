const express = require('express');
const router = express.Router();
const blogsController = require('../app/controllers/BlogsController');

router.post('/handle-form-actions', blogsController.handleFormAction);
router.patch('/:id/restore', blogsController.restore);
router.put('/:id', blogsController.update);
router.delete('/:id', blogsController.destroy);
router.delete('/:id/force', blogsController.forceDestroy);
router.get('/:id/edit', blogsController.edit);
router.get('/create', blogsController.create);
router.post('/store', blogsController.store);
router.get('/:slug', blogsController.show);
router.get('/', blogsController.index);

module.exports = router;
