const { mutipleMongooseToObject } = require('../../util/mongoose');
const Position = require('../models/Position');
class SiteController {
    // [GET] /home
    index(req, res, next) {
        res.render('home');
    }
    // [GET] /search
    search(req, res, next) {
        console.log(req.query.q);
        Position.findAll()
            .then((posi) => {
                res.json(posi);
            })
            .catch(next);
        // res.render('search');
    }
}

module.exports = new SiteController();
