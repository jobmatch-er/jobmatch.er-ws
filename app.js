console.log("Server starting up... ( ͡° ͜ʖ ͡°) MINZIG")
var createError = require('http-errors');
var express = require('express');
var logger = require('morgan')
var path = require('path');
var fetcher = require('./fetcher.js');
const passport = require('passport');
var flash = require('connect-flash');
var bodyParser = require('body-parser')
var ppconfig = require('./config/passport')
var session = require('express-session');
var cookieParser = require('cookie-parser')

var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var matchingRouter = require('./routes/matching');
var contactRouter = require('./routes/contact');

var app = express();
fetcher.start();

app.use(session({ cookie: { maxAge: 60000 }, 
  secret: 'yeet',
  resave: false, 
  saveUninitialized: false}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(logger('dev'));
app.use(flash());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
ppconfig(passport);

app.use('/', indexRouter);
app.use('/matching', matchingRouter);
app.use('/auth', authRouter);
app.use('/contact', contactRouter);

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

app.listen(3000);

module.exports = app;
