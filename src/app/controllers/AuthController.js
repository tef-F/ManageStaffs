const User2 = require('../models/User2');
const User = require('../models/User');
const Department = require('../models/Department');
const {
    initializeConnection,
    getSequelize,
    closeConnection,
    connectMSSQL,
} = require('../../config/db');
const UserTemp = require('../models/UserTemp');
const Staff = require('../models/Staff');
const { registerValidator } = require('../../validations/auth');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {
    mutipleMongooseToObject,
    mongooseToObject,
} = require('../../util/mongoose');

class AuthController {
    // [GET] /auth/login
    index(req, res, next) {
        res.render('auth/login', { layout: 'auth' });
    }
    // [POST] /auth/accept/:id
    async acceptUser(req, res, next) {
        const _id = req.params.id;
        const acceptUser = await UserTemp.findOne({ where: { id: _id } }).then(
            (user) => {
                return mongooseToObject(user);
            },
        );
        const checkEmailExist = await User.count({
            where: { email: acceptUser.email },
        });
        console.log(checkEmailExist);
        if (checkEmailExist >= 1) return res.json({ mess: 'User exists' });

        // const dataForm = { ...req.body };
        const maxIdStaff = await Staff.count('id').then((maxId) => maxId + 1);
        const dataFormatStaff = {
            ...acceptUser,
            id: `NV${maxIdStaff.toString().padStart(2, '0')}`,
            fullName: acceptUser.username,
        };
        delete dataFormatStaff.avatar;
        delete dataFormatStaff.role;
        delete dataFormatStaff.username;
        // return res.json(dataFormatStaff);
        const staff = Staff.create(dataFormatStaff)
            .then((staff) => {
                if (!staff) {
                    return res.json({
                        message: 'Staff exits',
                    });
                }
                return {
                    staff: mongooseToObject(staff),
                };
            })
            .catch((err) => {
                return res.json({
                    message: 'Create fail!',
                    err: err.message,
                });
            });
        const maxId = await User.count('id').then((maxId) => maxId + 1);
        var acceptDataUser = {
            ...acceptUser,
            id: `${maxId.toString().padStart(2, '0')}`,
            avatar: null,
            staffId: dataFormatStaff.id,
            role: 3,
        };
        // return res.json(acceptDataUser);
        const addUser = await User.create(acceptDataUser)
            .then((user) => {
                if (!user) {
                    return false;
                }
                return true;
            })
            .catch((err) => {
                return false;
            });
        if (!addUser) {
            return res.json({ mess: 'Cannot create user' });
        }
        UserTemp.destroy({
            where: {
                id: _id,
            },
        })
            .then(() => {
                return res.redirect('/me/request');
            })
            .catch((error) => {
                return res.json({ error: error.message });
            });
    }
    // [DELETE] /auth/accept/:id
    declineUser(req, res, next) {
        const _id = req.params.id;
        UserTemp.destroy({
            where: {
                id: _id,
            },
        })
            .then(() => {
                return res.redirect('/me/request');
            })
            .catch((error) => {
                return res.json({ error: error.message });
            });
    }
    //[POST] /auth/login
    async login(req, res, next) {
        User.findOne({ where: { email: req.body.email } })
            .then((user) => {
                if (!user) {
                    return res.status(422).send({
                        message: 'Email or Password is not incorrect!',
                    });
                }
                user = mongooseToObject(user);
                const checkPassword = bcrypt.compareSync(
                    req.body.password,
                    user.password,
                );
                if (checkPassword == false) {
                    return res.status(422).send({
                        message: 'Password is not incorrect!',
                    });
                }
                delete user.password;
                // closeConnection();
                // switch (user.role.trim()) {
                //     case '1':
                //         initializeConnection('SERVER_01');
                //         // connectMSSQL();
                //         console.log("B_K");
                //         break;
                //     case '2':
                //         initializeConnection('SERVER_02');
                //         // connectMSSQL();
                //         console.log("B_V");
                //         break;
                //     default:
                //         initializeConnection();
                //         // connectMSSQL();
                //         console.log("ROOT");
                //         break;
                // }

                const token = jwt.sign(
                    { id: user.id, role: user.role },
                    process.env.TOKEN_SECRET,
                    { expiresIn: 60 * 60 * 24 },
                );
                res.cookie('authToken', token);

                return res.json({
                    message: `${user.username} has logged in`,
                    status: 'success',
                    data: user,
                    token: token || null,
                });
            })
            .catch((err) => {
                return res.json({ message: err.message });
            });
    }
    //[GET] /auth/register
    register(req, res, next) {
        Department.findAll({
            attributes: [[getSequelize().literal('TRIM(id)'), 'MaPB']],
        })
            .then((MaPB) => {
                // res.json({ MaPB: mutipleMongooseToObject(MaPB) });
                return res.render('auth/register', {
                    layout: 'auth',
                    MaPB: mutipleMongooseToObject(MaPB),
                });
            })
            .catch((err) => {
                return res.json({ message: err.message });
            });
    }
    //[POST] /auth/store
    async store(req, res, next) {
        const formData = { ...req.body };
        const { error } = registerValidator(formData);

        const checkEmailExist = await User.count({
            where: { email: formData.email },
        });
        console.log(checkEmailExist);
        if (checkEmailExist >= 1) return res.json({ mess: 'User exists' });
        if (error) return res.status(422).send(error.details[0].message);
        delete formData.repeatPassword;

        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(formData.password, salt);
        const maxId = await User.count('id').then((maxId) => maxId + 1);
        var acceptData = {
            ...formData,
            id: `${maxId.toString().padStart(2, '0')}`,
            email: formData.email,
            username: formData.lastName + ' ' + formData.firstName,
            password: hashPassword,
            avatar: null,
            role: 1,
        };
        console.log(acceptData);
        User.create(acceptData)
            .then((user) => {
                res.json({
                    message: 'Successfully registere !',
                    user: mongooseToObject(user),
                    error: error,
                });
            })
            .catch(next());
    }
    //[GET] /auth/api/count-temp
    getCountTemp(req, res, next) {
        UserTemp.count()
            .then((count) => {
                return res.json(count);
            })
            .catch((err) => {
                return res.json(err.message);
            });
    }
    //[POST] /auth/storeTemp
    async storeTemp(req, res, next) {
        const formData = { ...req.body };
        const { error } = registerValidator(formData);

        const checkEmailExist = await UserTemp.count({
            where: { email: formData.email },
        });
        console.log(checkEmailExist);
        if (checkEmailExist >= 1) return res.json({ mess: 'User exists' });
        if (error) return res.status(422).send(error.details[0].message);
        delete formData.repeatPassword;

        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(formData.password, salt);
        const maxId = await UserTemp.count('id').then((maxId) => maxId + 1);
        var acceptData = {
            ...formData,
            id: `${maxId.toString().padStart(2, '0')}`,
            email: formData.email,
            username: formData.lastName + ' ' + formData.firstName,
            password: hashPassword,
            // departmentId: '',
        };
        console.log(acceptData);
        // return res.json(acceptData);
        UserTemp.create(acceptData)
            .then((user) => {
                if (!user)
                    return res.json({
                        message: 'Cannot create data!',
                    });
                return res.render('auth/notification', { layout: 'auth' });
                // res.json({
                //     message: 'Successfully registere !',
                //     user: mongooseToObject(user),
                //     error: error,
                // });
            })
            .catch((err) => {
                res.json(err.message);
            });
    }
    // [GET] /auth/forgot-password
    forgot(req, res, next) {
        res.render('auth/forgot-password', { layout: 'auth' });
    }
    //[POST] /auth/logout
    logout(req, res, next) {
        if (!req.params.token) {
            res.json({ error: 'Token ivalid' });
        }
        res.clearCookie('authToken');
        return res.redirect('/auth/login');
    }
}

module.exports = new AuthController();
