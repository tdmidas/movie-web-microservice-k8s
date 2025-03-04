const express = require('express');
const app = express();
const morgan = require('morgan');
const reponseTime = require('response-time');
const createError = require('http-errors');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes/Index');
const Authorization = require('./middlewares/Authorization');
const {
    HelmetLog, 
    ErrorLog
} = require('./config/Log');


require('./database/InitMongo');
require('./services/KafkaConsumer');

app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'], 
    allowedHeaders: ['Content-Type', 'Authorization'], 
    credentials: true,
}));
app.use(express.json());
app.use(reponseTime());
app.use(express.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(morgan('combined', {stream: HelmetLog}));
// app.use((req, res , next) => {
//     console.log(req);
//     return next();
// })
app.use(Authorization);

app.use('/', routes);



app.use((req, res, next) => {
    const error = new createError.NotFound();
    error.code = 404
    next(error);
})

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || createError.InternalServerError.name.toString();
    const resMessage = `${message} - ${statusCode} - ${Date.now() - err.now} ms`
    ErrorLog.write(`${resMessage}\n`);
    return res.status(statusCode).json({
        code: statusCode,
        message: message
    })
})

module.exports = app;