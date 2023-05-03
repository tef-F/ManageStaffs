const blogsRouter = require('./blogs');
const siteRouter = require('./site');
const meRouter = require('./me');
const authRouter = require('./auth');
const staffRouter = require('./staff');
const areaRouter = require('./area');
const literacyRouter = require('./literacy');
const positionRouter = require('./position');


function route(app) {
    app.use('/literacys', literacyRouter);
    app.use('/positions', positionRouter);
    app.use('/areas', areaRouter);
    app.use('/auth', authRouter);
    app.use('/staffs', staffRouter);
    app.use('/blogs', blogsRouter);
    app.use('/me', meRouter);
    app.use('/', siteRouter);
}

module.exports = route;
