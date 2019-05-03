var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var cors = require('cors');
var mongoose = require('./models/Mongoose');
const pug = require('pug');

var adminRouter = require('./routes/admin');
var vendorRouter = require('./routes/vendor');
var consumerRouter = require('./routes/consumer');
var payment = require('./payment/PaymentApi');
var userRoute = require('./routes/user');
var verifyroute = require('./routes/verifyuser')
var jwt = require('jsonwebtoken');

var app = express();

app.set('secretKey', 'Foodcourt');

// establishing connection
mongoose.on('error', function (err) {
  console.log('Connection error', err);
});
mongoose.once('open', function () {
  console.log('Connected to DB.');
});

app.use(cors());

app.use(logger('dev'));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug')

app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRouter);
app.use('/vendor', vendorRouter);
app.use('/consumer', consumerRouter);
app.use('/user', userRoute);
app.use('/user/loginverify', validateUser, verifyroute);

app.get('/callPaymentPage/:oid', ((req, res) => {
  payment.callPaymentPage(req, res);
}));

app.post("/charge/:oid", function (req, res) {
  payment.chargeCustomer(req, res);
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

function validateUser(req, res, next) {
  jwt.verify(req.body.token, req.app.get('secretKey'), function (err, decoded) {
    if (err) {
      res.json({ status: "error", message: err.message, app: null });
    } else {
      req.body.id = decoded.id;
      next();
    }
  });
}

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err.message);
});

module.exports = app;
