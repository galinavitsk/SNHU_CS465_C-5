var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var handlebars=require('hbs');

var indexRouter = require('./server/routes/index');
var travelRouter = require('./server/routes/travel');
var usersRouter = require('./server/routes/users');
var contactRouter=require('./server/routes/contact');
var aboutRouter=require('./server/routes/about');
var mealsRouter=require('./server/routes/meals');
var roomsRouter=require('./server/routes/rooms');
var newsRouter=require('./server/routes/news');
var apiRouter=require('./api/routes/index');

require('./api/models/db');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'server','views'));

handlebars.registerPartials(__dirname + '/server/views/partials');

app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('', indexRouter);
app.use('/', indexRouter);
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
})

app.use('/rooms',roomsRouter);
app.use('/meals',mealsRouter);
app.use('/news',newsRouter);
app.use('/contact',contactRouter);
app.use('/about',aboutRouter);
app.use('/travel',travelRouter);
app.use('/users', usersRouter);
app.use('/api',apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
