const tokenHelper = require('../../util/token');

module.exports = {
    authAPI(req, res, next) {
        const token = req.cookies.authToken;
        if (!token) return res.status(401).json({ message: 'Access Denied' });

        try {
            const decoded = tokenHelper.verifyToken(token);
            const exp = decoded.exp;
            const currentTime = Math.floor(Date.now() / 1000);
            const timeToExpiration = exp - currentTime;
            const refreshThreshold = 60 * 30; // 30 minutes
            if (timeToExpiration < refreshThreshold) {
                next();
            }
            // return res.json(payload);
            // next();
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
