var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var deliveryRoutes = require('./routes/postData');
var loginPage = require('./routes/validateUser');
var cookDetails = require('./routes/cookDetails');
var customerDetails = require('./routes/customerDetails');
var deliveryDetails = require('./routes/deliveryDetails');

var app = express();

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'example.com');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}

app.use(allowCrossDomain);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.post('/newOrder', deliveryRoutes);

app.post('/user/validateUser', loginPage.userValidation);
app.post('/user/registerUser', loginPage.userRegistration);

app.post('/cook/getCookDetails', cookDetails.getCookDetails);
app.post('/cook/getNCookDetails', cookDetails.getNCookDetails);
app.post('/cook/addCookDetails', cookDetails.addCookDetails);

app.post('/customer/getCustomerDetails', customerDetails.getCustomerDetails);
app.post('/customer/getNCustomerDetails', customerDetails.getNCustomerDetails);
app.post('/customer/addCustomerDetails', customerDetails.addCustomerDetails);

app.post('/delivery/getDerliveryDetails', deliveryDetails.getDeliveryDetails);
app.post('/delivery/getNDerliveryDetails', deliveryDetails.getNDeliveryDetails);
app.post('/delivery/addDeliveryDetails', deliveryDetails.addDeliveryDetails);
app.post('/delivery/checkDelivery', deliveryDetails.getCurrentDeliveryDetails)
app.post('/delivery/locationUpdate', deliveryDetails.updateLocation)

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
