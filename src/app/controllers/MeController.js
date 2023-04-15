const Blog = require('../models/Blog');
const Staff = require('../models/Staff');
const { mutipleMongooseToObject } = require('../../util/mongoose');
const { verifyToken } = require('../../util/token');
class MeController {
    // [GET] /me
    index(req, res, next) {
        res.send('me');
    }
    // [GET] /me/stored/staffs
    async storedStaffs(req, res, next) {
        const { id, role } = verifyToken(req.cookies.authToken);
        var dataGetType = {
            MaKhu: "",
        };
        if (role) {
            switch (role.trim()) {
                case '0':
                    dataGetType = {};
                    break;
                case '1':
                    dataGetType.MaKhu = 'B_K';
                    break;
                case '2':
                    dataGetType.MaKhu = 'B_V';
                    break;
                default:
                    break;
            }
        }
        Staff.findAll({ where: dataGetType })
            .then((staffs) => {
                res.render('me/staffs', {
                    staffs: mutipleMongooseToObject(staffs),
                });
            })
            .catch((error) => next(error));
    }
    // [GET] /me/stored/blogs
    storedBlogs(req, res, next) {
        let blogSort = Blog.find({});

        if (req.query.hasOwnProperty('_sort')) {
            blogSort = blogSort.sort({
                [req.query.column]: req.query.type,
            });
        }
        Promise.all([blogSort, Blog.countDocumentsDeleted()])
            .then(([blogs, countDeleted]) => {
                res.render('me/blogs', {
                    countDeleted,
                    blogs: mutipleMongooseToObject(blogs),
                });
            })
            .catch((error) => next(error));
    }
    // [GET] /me/trash/blogs
    trashBlogs(req, res, next) {
        Blog.findDeleted({})
            .then((blogs) => {
                res.render('me/trash-blogs', {
                    blogs: mutipleMongooseToObject(blogs),
                });
            })
            .catch((error) => next(error));
    }
}

module.exports = new MeController();
