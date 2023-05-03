const { sequelizeChange } = require('../../config/db/index');
const {verifyToken} = require('../../util/token');

module.exports = {
    serverRole(req, res, next) {
        const token = req.cookies.authToken;
        const { id, role } = verifyToken(token);
        switch (role) {
            case 1:
                sequelizeChange('SERVER_01');
                if (!token || token === undefined) {
                    res.redirect('/auth/login');
                } else {
                    next();
                }
                break;
            case 2:
                sequelizeChange('SERVER_02');
                if (!token || token === undefined) {
                    res.redirect('/auth/login');
                } else {
                    next();
                }
                break;
            default:
                break;
        }
    },
};
