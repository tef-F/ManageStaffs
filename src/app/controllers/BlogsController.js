const Blog = require('../models/Blog');
const {
    mutipleMongooseToObject,
    mongooseToObject,
} = require('../../util/mongoose');
class BlogsController {
    // [GET] /blogs
    index(req, res, next) {
        Blog.find({})
            .then((blogs) => {
                res.render('blogs', {
                    blogs: mutipleMongooseToObject(blogs),
                });
            })
            .catch((error) => next(error));
    }

    // [GET] /blogs/:slug
    show(req, res, next) {
        Blog.findOne({ slug: req.params.slug })
            .then((blog) => {
                res.render('blogs/show', { blog: mongooseToObject(blog) });
            })
            .catch((error) => next(error));
    }
    // [GET] /blogs/create
    create(req, res, next) {
        res.render('blogs/create');
    }

    // [POST] /blogs/store
    store(req, res, next) {
        const dataForm = { ...req.body };
        dataForm.image = './img/avatars/5.png';
        dataForm.author = 'Mỹ Duyên';
        const blog = new Blog(dataForm);
        blog.save()
            .then(() => {
                res.redirect('/me/stored/blogs');
            })
            .catch(next);
    }

    // [GET] /blogs/:id/edit
    edit(req, res, next) {
        const _id = req.params.id;
        Blog.findById(_id)
            .then((blog) =>
                res.render('blogs/edit', {
                    blog: mongooseToObject(blog),
                }),
            )
            .catch(next);
    }
    // [PUT] /blogs/:id
    update(req, res, next) {
        const _id = req.params.id;
        Blog.updateOne({ _id: _id }, req.body)
            .then(() => {
                res.redirect('/me/stored/blogs');
            })
            .catch(next);
    }
    // [PATCH] /blogs/:id/restore
    restore(req, res, next) {
        const _id = req.params.id;
        Blog.restore({ _id: _id })
            .then(() => {
                res.redirect('back');
            })
            .catch(next);
    }
    // [DELETE] /blogs/:id
    destroy(req, res, next) {
        const _id = req.params.id;
        Blog.delete({ _id: _id })
            .then(() => {
                res.redirect('back');
            })
            .catch(next);
    }
    // [DELETE] /blogs/:id/force
    forceDestroy(req, res, next) {
        const _id = req.params.id;
        Blog.deleteOne({ _id: _id })
            .then(() => {
                res.redirect('back');
            })
            .catch(next);
    }
    // [POST] /blogs/handle-form-actions
    handleFormAction(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                Blog.delete({ _id: { $in: req.body.checkedIds } })
                    .then(() => {
                        res.redirect('back');
                    })
                    .catch(next);
                break;
            case 'restore':
                Blog.restore({ _id: { $in: req.body.checkedIds } })
                    .then(() => {
                        res.redirect('back');
                    })
                    .catch(next);
                break;

            default:
                res.json({ status: 400, message: 'Action invalid' });
                break;
        }
    }
}
module.exports = new BlogsController();
