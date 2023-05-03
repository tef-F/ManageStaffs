const { mutipleMongooseToObject, mongooseToObject } = require('../../util/mongoose');
const Position = require('../models/Position');
const Literacy = require('../models/Literacy');
class LiteracyController {
    // [GET] /home
    index(req, res, next) {
        res.render('home');
    }
    edit(req, res, next) {
        Literacy.findOne({ where: { id: req.params.id } })
        .then((literacy) => {
            return res.render('literacy/edit', {
                literacy: mongooseToObject(literacy),
            });
        }).catch((err) => {

        })
    }
    update(req, res, next) {
        const dataForm = req.body;
        const _id = req.params.id;
        Literacy.update(dataForm, {
            where: {
                id: _id,
            },
        })
            .then((literacy) => {
                if (!literacy) {
                    return res.json({ message: 'Update failed!!!' });
                }
                return res.redirect('back');
            })
            .catch((err) => {
                return res.json({ message: err.message });
            });
    }
}

module.exports = new LiteracyController();
