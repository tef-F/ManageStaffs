const Blog = require('../models/Blog');
const Staff = require('../models/Staff');
const User = require('../models/User');
const Area = require('../models/Area');
const Department = require('../models/Department');
const UserTemp = require('../models/UserTemp');
const Literacy = require('../models/Literacy');
const Position = require('../models/Position');
const {
    mutipleMongooseToObject,
    mongooseToObject,
} = require('../../util/mongoose');
const { verifyToken } = require('../../util/token');
class MeController {
    // [GET] /me
    index(req, res, next) {
        res.send('me');
    }
    // [GET] /me/profile
    async profile(req, res, next) {
        const { id, role } = verifyToken(req.cookies.authToken);

        const currentUser = await User.findOne({ where: { id: id } }).then(
            (user) => mongooseToObject(user),
        );
        Staff.findOne({ where: { id: currentUser.staffId } })
            .then((staff) => {
                res.render('me/profile', {
                    user: currentUser,
                    staff: mongooseToObject(staff),
                });
                // res.json({ user: currentUser, staff: mongooseToObject(staff) });
            })
            .catch((err) => {
                res.json({ message: err.message });
            });
    }
    // [GET] /me/request
    requestStaff(req, res, next) {
        UserTemp.findAll()
            .then((user) => {
                res.render('me/accept', {
                    users: mutipleMongooseToObject(user),
                });
            })
            .catch((err) => {});
    }
    // [POST] /me/request
    requestStaffAPI(req, res, next) {
        UserTemp.count()
            .then((num) => {
                res.json({
                    count: num,
                });
            })
            .catch((err) => {
                message: err.message;
            });
    }
    // [GET] /me/stored/staffs
    async storedStaffs(req, res, next) {
        const { id, role } = verifyToken(req.cookies.authToken);
        var dataGetType = {
            where: {
                area: '',
            },
        };
        
        if (role) {
            switch (role.trim()) {
                case '0':
                    dataGetType = {};
                    break;s
                case '1':
                    dataGetType = {
                        where: {
                            area: 'B_K',
                        },
                    };
                    break;
                case '2':
                    dataGetType ={
                        where: {
                            area: 'B_V',
                        },
                    };
                    break;
                case '3':
                    // dataGetType.area = 'B_V';
                    break;
                default:
                    break;
            }
        }
        console.log(dataGetType);
        Staff.findAll(dataGetType)
            .then((staffs) => {
                res.render('me/staffs', {
                    staffs: mutipleMongooseToObject(staffs),
                });
            })
            .catch((error) => next(error));
    }

    // [GET] /me/stored/staffs
    async storedLiteracy(req, res, next) {
       
        Literacy.findAll()
            .then((literacys) => {
                res.render('me/literacys', {
                    literacys: mutipleMongooseToObject(literacys),
                });
            })
            .catch((error) => next(error));
    }
     // [GET] /me/stored/staffs
     async storedPosition(req, res, next) {
       
        Position.findAll()
            .then((positions) => {
                res.render('me/position', {
                    positions: mutipleMongooseToObject(positions),
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
    // [GET] /me/stored/areas/:condition
    storedAreas(req, res, next) {
        const condition = req.params.condition;
        Promise.all([
            Staff.findAll({
                where: {
                    area: 'B_V',
                },
            }),
            Staff.findAll({
                where: {
                    area: 'B_K',
                },
            }),
            Staff.findAll({
                where: {
                    departmentId: 'CTSV',
                },
            }),
            Staff.findAll({
                where: {
                    departmentId: 'DT',
                },
            }),
            Staff.findAll({
                where: {
                    departmentId: 'HTQT',
                },
            }),
            Staff.findAll({
                where: {
                    departmentId: 'KT',
                },
            }),
            Staff.findAll({
                where: {
                    departmentId: 'KTT',
                },
            }),
            Department.findAll(),
        ])
            .then(
                ([
                    staffBV,
                    staffBK,
                    staffCTSV,
                    staffDT,
                    staffHTQT,
                    staffKT,
                    staffKTT,
                    department,
                ]) => {
                    // return res.json(department);
                    switch (condition) {
                        case 'B_K':
                            return res.render('me/areas', {
                                departments:
                                    mutipleMongooseToObject(department),
                                staffs: mutipleMongooseToObject(staffBK),
                            });
                        case 'B_V':
                            return res.render('me/areas', {
                                departments:
                                    mutipleMongooseToObject(department),
                                staffs: mutipleMongooseToObject(staffBV),
                            });
                        case 'CTSV':
                            return res.render('me/areas', {
                                departments:
                                    mutipleMongooseToObject(department),
                                staffs: mutipleMongooseToObject(staffCTSV),
                            });
                        case 'DT':
                            return res.render('me/areas', {
                                departments:
                                    mutipleMongooseToObject(department),
                                staffs: mutipleMongooseToObject(staffDT),
                            });
                        case 'HTQT':
                            return res.render('me/areas', {
                                departments:
                                    mutipleMongooseToObject(department),
                                staffs: mutipleMongooseToObject(staffHTQT),
                            });
                        case 'KT':
                            return res.render('me/areas', {
                                departments:
                                    mutipleMongooseToObject(department),
                                staffs: mutipleMongooseToObject(staffKT),
                            });
                        case 'KTT':
                            return res.render('me/areas', {
                                departments:
                                    mutipleMongooseToObject(department),
                                staffs: mutipleMongooseToObject(staffKTT),
                            });

                        default:
                            return res.render('me/areas', {
                                departments:
                                    mutipleMongooseToObject(department),
                                staffs: mutipleMongooseToObject(staffBV),
                            });
                    }
                },
            )
            .catch((error) => {
                return res.json({ error: error.message });
            });
    }
}

module.exports = new MeController();
