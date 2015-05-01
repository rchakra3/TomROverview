var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


/***********************CUSTOM CODE******************************************/
fs = require('fs');
var io = require('socket.io-client');
opt    = {transports: ['websocket']}
socket = io.connect('http://localhost:3000',opt);
console.log('Connected')
socket.on('connect', function () { console.log("socket connected"); });

function updateFunction(interval,selfIP){

    var timer=setInterval(function(){   
        fs.readFile('./keyList', 'utf8', function (err,data) {
            if (err) {
                throw err;
            }
            socket.emit('update message', {ip:selfIP, keys: data});
        })
    },interval);
}

var selfIP=fs.readFile('./selfIP', 'utf8', function (err,data) {
    var selfIP=data;
    updateFunction(5000,selfIP);

});










module.exports = app;
