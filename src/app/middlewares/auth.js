const tokenHelper = require('../../util/token');

module.exports = {
    authAPI(req, res, next) {
        const token = req.cookies.authToken;
        if (!token) return res.status(401).json({ message: 'Access Denied' });

        try {
            const payload = tokenHelper.verifyToken(token);
            // return res.json(payload);
            next();
        } catch (err) {
            return res.status(400).json({ message: 'Invalid Token', err });
        }
    },
    loginRedirect(req, res, next) {
        const token = req.cookies.authToken;

        if (!token || token === undefined) {
            next();
        } else {
            try {
                res.redirect('/me/stored/staffs');
            } catch (err) {
                return res.status(400).json({ message: 'Invalid Token', err });
            }
        }
    },

    auth(req, res, next) {
        const token = req.cookies.authToken;
        if (!token || token === undefined) {
            res.redirect('/auth/login');
        } else {
            next();
        }
    },
};
