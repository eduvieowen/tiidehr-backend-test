var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// add page routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var staffRouter = require('./routes/staff');
var rolesRouter = require('./routes/roles')
var leavesRouter = require('./routes/leaves')
var authRouter = require('./routes/authRoute')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// use page routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/staff', staffRouter);
app.use('/roles', rolesRouter);
app.use('/leaves', leavesRouter);
app.use('/auth', authRouter);

// syncing with DB tbales/models
const db = require('./models/db');
db.sequelize
  .sync({alter:true})
  .then(() => {
    console.log('------MODELS SYNCED WITH DB------');
  })
  .catch((err) => {
    console.log('------COULD NOT SYNC MODELS WITH DB------', err);
  });

// db.sequelize
//   .sync({ force: true })
//   .then(() => {
//     return db.users.create(
//       {
//         firstName: 'Ed',
//         middleName: 'Owen',
//         lastName: 'Udusegbe',
//         username: 'space_ed',
//         hashedPassword: 'ed123',
//         email: 'ed@gmail.com'
//       })
//   });

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
