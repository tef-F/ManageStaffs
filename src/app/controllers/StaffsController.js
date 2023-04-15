const Position = require('../models/Position');
const Department = require('../models/Department');
const Academic = require('../models/Academic');
const Salary = require('../models/Salary');
const Block = require('../models/Block');
const Contract = require('../models/Contract');
const { sequelize } = require('../../config/db');
const { mutipleMongooseToObject } = require('../../util/mongoose');

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
    // [GET] /create
    create(req, res, next) {
        Promise.all([
            Department.findAll({
                attributes: [[sequelize.literal('TRIM(MaPB)'), 'MaPB']],
            }),
            Academic.findAll({
                attributes: [[sequelize.literal('TRIM(MaTDHV)'), 'MaTDHV']],
            }),
            Salary.findAll({
                attributes: [[sequelize.literal('TRIM(BacLuong)'), 'BacLuong']],
            }),
            Block.findAll({
                attributes: [[sequelize.literal('TRIM(MaKhu)'), 'MaKhu']],
            }),
            Position.findAll({
                attributes: [[sequelize.literal('TRIM(MaCV)'), 'MaCV']],
            }),
            Contract.findAll({
                attributes: [[sequelize.literal('TRIM(MaHD)'), 'MaHD']],
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
    store(req, res, next) {
        const dataForm = { ...req.body };
        res.json(dataForm);
    }
    // [POST] /stored-position
    async storedPosition(req, res, next) {
        const formData = { ...req.body };
        //res.json(formData);
        await Position.create({
            ...formData,
            MaCV: 'BVe',
            TenCV: 'Bao Ve',
        })
            .then((posi) => {
                res.json(posi);
            })
            .catch((error) => console.log(error));
    }
}

module.exports = new StaffsController();
