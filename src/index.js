const morgan = require('morgan');
const path = require('path');
const express = require('express');
const { engine } = require('express-handlebars');
const app = express();
const route = require('./routes');
const db = require('./config/db');
const methodOverride = require('method-override');
const SortMiddlewate = require('./app/middlewares/SortMiddlewate');
const cookieParser = require('cookie-parser');
const { ...helpers } = require('./util/helpers');
const dotenv = require('dotenv');
const http = require('http');

/*
*
!
?
TODO
@param
 */
// env
dotenv.config();
// DB Connect
db.connect();
db.connectMSSQL();
// Method overwrite
app.use(methodOverride('_method'));
//
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Set Public folder
app.use(express.static(path.join(__dirname, 'public')));
// custom middlewares
app.use(SortMiddlewate);
// HTTP log
// app.use(morgan('combined'));
// Template Engine
app.engine(
    '.hbs',
    engine({
        extname: '.hbs',
        // Funcion Helper
        helpers,
    }),
);
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'resources/views'));
// Route init
route(app);

const server = http.createServer(app);

server.listen(process.env.APP_PORT, () => {
    console.log(
        `Server running at http://${process.env.APP_HOST}:${process.env.APP_PORT}/`,
    );
});
