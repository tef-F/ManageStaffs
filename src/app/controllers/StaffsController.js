const Position = require('../models/Position');
const Department = require('../models/Department');
const Literacy = require('../models/Literacy');
const Salary = require('../models/Salary');
const Area = require('../models/Area');
const Contract = require('../models/Contract');
const Staff = require('../models/Staff');
const { sequelizeChange } = require('../../config/db');
const {
    mutipleMongooseToObject,
    mongooseToObject,
} = require('../../util/mongoose');
const staffValidation = require('../../validations/staff');
class StaffsController {
    // [GET] /home
    index(req, res, next) {
        res.render('home');
    }
    // [GET] /show
    showPosition(req, res, next) {
        Position.findAll()
            .then((posi) => {
                res.json(posi);
            })
            .catch(next);
    }
    // [GET] /create-position
    createPosition(req, res, next) {
        res.render('staffs/createPosition');
    }
    // [GET] /edit/:id
    edit(req, res, next) {
        Promise.all([
            Staff.findOne({ where: { id: req.params.id } }),
            Department.findAll({
                attributes: [[sequelizeChange().literal('TRIM(id)'), 'MaPB']],
            }),
            Literacy.findAll({
                attributes: [[sequelizeChange().literal('TRIM(id)'), 'MaTDHV']],
            }),
            Salary.findAll({
                attributes: [
                    [
                        sequelizeChange().literal('TRIM(salaryScale)'),
                        'BacLuong',
                    ],
                ],
            }),
            Area.findAll({
                attributes: [[sequelizeChange().literal('TRIM(id)'), 'MaKhu']],
            }),
            Position.findAll({
                attributes: [[sequelizeChange().literal('TRIM(id)'), 'MaCV']],
            }),
            Contract.findAll({
                attributes: [[sequelizeChange().literal('TRIM(id)'), 'MaHD']],
            }),
        ])
            .then(([staff, MaPB, MaTDHV, BacLuong, MaKhu, MaCV, MaHD]) => {
                return res.render('staffs/edit', {
                    staff: mongooseToObject(staff),
                    MaPB: mutipleMongooseToObject(MaPB),
                    MaTDHV: mutipleMongooseToObject(MaTDHV),
                    BacLuong: mutipleMongooseToObject(BacLuong),
                    MaKhu: mutipleMongooseToObject(MaKhu),
                    MaCV: mutipleMongooseToObject(MaCV),
                    MaHD: mutipleMongooseToObject(MaHD),
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }
    // [PUT] /:id
    update(req, res, next) {
        const dataForm = req.body;
        const _id = req.params.id;
        Staff.update(dataForm, {
            where: {
                id: _id,
            },
        })
            .then((staff) => {
                if (!staff) {
                    return res.json({ message: 'Update failed!!!' });
                }
                return res.redirect('back');
            })
            .catch((err) => {
                return res.json({ message: err.message });
            });
    }
    // [GET] /create
    create(req, res, next) {
        Promise.all([
            Department.findAll({
                attributes: [[sequelizeChange().literal('TRIM(id)'), 'MaPB']],
            }),
            Literacy.findAll({
                attributes: [[sequelizeChange().literal('TRIM(id)'), 'MaTDHV']],
            }),
            Salary.findAll({
                attributes: [
                    [
                        sequelizeChange().literal('TRIM(salaryScale)'),
                        'BacLuong',
                    ],
                ],
            }),
            Area.findAll({
                attributes: [[sequelizeChange().literal('TRIM(id)'), 'MaKhu']],
            }),
            Position.findAll({
                attributes: [[sequelizeChange().literal('TRIM(id)'), 'MaCV']],
            }),
            Contract.findAll({
                attributes: [[sequelizeChange().literal('TRIM(id)'), 'MaHD']],
            }),
        ])
            .then(([MaPB, MaTDHV, BacLuong, MaKhu, MaCV, MaHD]) => {
                return res.render('staffs/create', {
                    MaPB: mutipleMongooseToObject(MaPB),
                    MaTDHV: mutipleMongooseToObject(MaTDHV),
                    BacLuong: mutipleMongooseToObject(BacLuong),
                    MaKhu: mutipleMongooseToObject(MaKhu),
                    MaCV: mutipleMongooseToObject(MaCV),
                    MaHD: mutipleMongooseToObject(MaHD),
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }
    // [POST] /store
    async store(req, res, next) {
        const dataForm = { ...req.body };
        const maxId = await Staff.count('id').then((maxId) => maxId + 1);

        const dataFormat = {
            ...dataForm,
            id: `NV${maxId.toString().padStart(2, '0')}`,
        };
        // return res.json(dataFormat);
        Staff.create(dataFormat)
            .then((staff) => {
                if (!staff) {
                    return res.json({
                        message: 'Staff exits',
                    });
                }
                // return res.redirect('/me/stored/staff');
                return res.json({
                    message: 'Create successfully!',
                    staff: mongooseToObject(staff),
                });
            })
            .catch((err) => {
                return res.json({
                    message: 'Create fail!',
                    err: err.message,
                });
            });
    }
    // [POST] /api/:area
    getStaffByAreaAPI(req, res, next) {
        const _area = req.params.area;

        Staff.findAll({ where: { area: _area } })
            .then((staff) => {
                return res.json(staff);
            })
            .catch((err) => {
                return res.json(err.message);
            });
    }
    // [POST] /stored-position
    async storedPosition(req, res, next) {
        const formData = { ...req.body };
        //res.json(formData);
        await Position.create({
            ...formData,
            id: 'BVe',
            name: 'Bao Ve',
        })
            .then((posi) => {
                res.json(posi);
            })
            .catch((error) => console.log(error));
    }
}

module.exports = new StaffsController();
