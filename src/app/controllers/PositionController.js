const { mutipleMongooseToObject, mongooseToObject } = require('../../util/mongoose');
const Position = require('../models/Position');

class PositionController {
    // [GET] /home
    index(req, res, next) {
        res.render('home');
    }

    create(req, res, next) {
        return res.render('position/create');
    }   

    store(req, res, next) {
        const dataForm = { ...req.body };

        Position.create(dataForm)
        .then((position) => {
            if (!position) {
                return res.json({
                    message: 'Position exits',
                });
            }
            return res.redirect('/me/stored/positions');
            return res.json({
                message: 'Create successfully!',
                position: mongooseToObject(position),
            });
        })
        .catch((err) => {
            return res.json({
                message: 'Create fail!',
                err: err.message,
            });
        });

    }
    edit(req, res, next) {
        Position.findOne({ where: { id: req.params.id } })
        .then((position) => {
            return res.render('position/edit', {
                position: mongooseToObject(position),
            });
        }).catch((err) => {

        })
    }
    update(req, res, next) {
        const dataForm = req.body;
        const _id = req.params.id;
        Position.update(dataForm, {
            where: {
                id: _id,
            },
        })
            .then((position) => {
                if (!position) {
                    return res.json({ message: 'Update failed!!!' });
                }
                return res.redirect('/me/stored/positions');
            })
            .catch((err) => {
                return res.json({ message: err.message });
            });
    }
}

module.exports = new PositionController();
