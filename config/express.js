// create new file ./config/express.js
//จัดการเกี่ยวกับexpress
import express from 'express';
import morgan from 'morgan';
import compression from 'compression';
import bodyParser from 'body-parser';
import session from 'express-session';
import passport from 'passport';


module.exports = function () {
    const app = express();

    if (process.env.NODE_ENV === "development") {
        app.use(morgan('dev'));
    }
    else {
        app.use(compression());
    }

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    // Add headers
    // app.use(function (req, res, next) {
    //     // Website you wish to allow to connect
    //     res.setHeader('Access-Control-Allow-Origin', '*');

    //     // Request methods you wish to allow
    //     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    //     // Request headers you wish to allow
    //     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    //     // Set to true if you need the website to include cookies in the requests sent
    //     // to the API (e.g. in case you use sessions)
    //     res.setHeader('Access-Control-Allow-Credentials', true);

    //     // Pass to next layer of middleware
    //     next();
    // });

    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    var config = require('./config');
    app.use(session({
        secret: config.sessionSecret,
        resave: false,
        saveUninitializeed: true
    }));

    app.use(passport.initialize()); // start passport
    app.use(passport.session()); // use session via express-session

    var path = require("path");
    app.set('views', path.join(__dirname + '/../app/views/home.html'));
    app.engine('html', require('ejs').renderFile);
    app.set('view engine', 'ejs');


    require('../app/routes/index.route')(app); //import ตัวจัดการrouting ต้องอยู่หลัง app.use ทั้งหมด
    require('../app/routes/user.route')(app);
    require('../app/routes/post.route')(app);

    return app;
}