const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const path = require('path');
const app = express();

const indexRouter = require('./routes/index');
const taskRouter = require('./routes/task');
const userRouter = require('./routes/user');
const projectRouter = require('./routes/project');
const commentRouter = require('./routes/comment');
const authRouter = require('./routes/authenticate');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('etag', true);
app.set('env', 'dev');
app.set('case sensitive routing', true);
app.set('strict routing', true);
app.set('x-powered-by', false);
app.set('view cache', false);

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// DB CONNECTION SINGLE
let db = null;
const url = 'mongodb://mwaproject:MWA_pms_123@ds147659.mlab.com:47659/mwa_pms';
// const url = 'mongodb://localhost:27017/mwaproject';
app.use(function (req, res, next) {
    if (!db) {
        MongoClient.connect(url, function (err, client) {
            if (err) throw err;
            db = client.db('mwa_pms');
            // db = client.db('mwaproject');
            req.db = db;
            return next();
        });
    } else {
        req.db = db;
        return next();
    }
});

app.use('/', indexRouter);

app.use('/api/auth', authRouter);
app.use('/api/task', taskRouter);
app.use('/api/user', userRouter);
app.use('/api/project', projectRouter);
app.use('/api/comment', commentRouter);

app.listen(3000, function () {
    console.log('Listening 3000...');
});

module.exports = app;