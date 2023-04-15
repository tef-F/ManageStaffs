const blogsRouter = require('./blogs');
const siteRouter = require('./site');
const meRouter = require('./me');
const authRouter = require('./auth');
const staffRouter = require('./staff');

function route(app) {
    app.use('/auth', authRouter);
    app.use('/staffs', staffRouter);
    app.use('/blogs', blogsRouter);
    app.use('/me', meRouter);
    app.use('/', siteRouter);
}

module.exports = route;
