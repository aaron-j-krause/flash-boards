var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var app = express();

var assignPassportBasic = require('./lib/basic-strategy');

var assignUserRoutes = require('./routes/user-routes');
var assignPostRoutes = require('./routes/post-routes');
var assignThreadRoutes = require('./routes/thread-routes');

//middleware
var morgan = require('morgan');
var bodyParser = require('body-parser');

//passport
app.set('appSecret', process.env.SECRET || 'chaaaaaange');
app.use(passport.initialize());
assignPassportBasic(passport);

if (!(process.env.TEST_MODE)) app.use(morgan('dev'));
app.use(bodyParser.json());

//routes
var userRouter = express.Router();
var postRouter = express.Router();
var threadRouter = express.Router();

assignPostRoutes(postRouter);
assignUserRoutes(userRouter, passport, app.get('appSecret'));
assignThreadRoutes(threadRouter);

app.use('/user', userRouter);
app.use('/posts', postRouter);
app.use('/threads', threadRouter);
app.use(express.static(__dirname + '/build'));

//db
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/dev_db');

var server = app.listen((process.env.PORT || 3000), function(port) {
  console.log('listening on ' + (process.env.PORT || 3000));
});
