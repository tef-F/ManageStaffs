const { mutipleMongooseToObject } = require('../../util/mongoose');
const Area = require('../models/Area');
class AreaController {
    // [GET] /home
    index(req, res, next) {
        res.render('area/manage');
    }
}

module.exports = new AreaController();
