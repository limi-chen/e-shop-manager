const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();


// 允许跨域
app.all("*", function(req, res, next) {
    if (!req.get("Origin")) return next();
    // use "*" here to accept any origin
    res.set("Access-Control-Allow-Origin","*");
    res.set("Access-Control-Allow-Methods", "GET");
    res.set("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
    // res.set('Access-Control-Allow-Max-Age', 3600);
    if ("OPTIONS" === req.method) return res.sendStatus(200);
    next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
	// secret: 配置加密字符串，它会在原有加密的基础上和z合格字符串拼起来加密
	//目的是为了增加安全性，防止客户端恶意伪造
  secret: 'limi',  
  resave: false,
  saveUninitialized: true, //无论你是否使用 Session ,我都默认直接分配给你一把钥匙
  cookie: { maxAge : 1000 * 60 * 60 * 24 }  //设置session的有效时间
}))

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
