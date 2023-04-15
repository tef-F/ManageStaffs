const User2 = require('../models/User2');
const User = require('../models/User');
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
                    user.Password,
                );
                if (checkPassword == false) {
                    return res.status(422).send({
                        message: 'Password is not incorrect!',
                    });
                }
                delete user.Password;

                const token = jwt.sign(
                    { id: user.MaTK, role: user.Role },
                    process.env.TOKEN_SECRET,
                    { expiresIn: 60 * 60 * 24 },
                );
                res.cookie('authToken', token);

                return res.json({
                    message: `${user.Username} has logged in`,
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
        res.render('auth/register', { layout: 'auth' });
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

        var acceptData = {
            ...formData,
            MaTK: '02',
            Email: formData.email,
            Username: formData.lastName + ' ' + formData.firstName,
            Password: hashPassword,
            Avatar: null,
            Role: 1,
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
