var express = require('express');
var mongoose = require('mongoose');
var app = express();

var assignUserRoutes = require('./routes/userRoutes');
var assignPostRoutes = require('./routes/postRoutes');

//middleware
var morgan = require('morgan');
var bodyParser = require('body-parser');

//passport
app.set('appSecret', process.env.SECRET || 'chaaaaaange');

if (!(process.env.TEST_MODE)) app.use(morgan('dev'));
app.use(bodyParser.json());

//routes
var userRouter = express.Router();
var postRouter = express.Router();

assignPostRoutes(postRouter);
assignUserRoutes(userRouter);

app.use('/user', userRouter);
app.use('/posts', postRouter);
app.use(express.static(__dirname + '/build'));

//db
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/dev_db');

var server = app.listen((process.env.PORT || 3000), function(port) {
  console.log('listening on ' + (process.env.PORT || 3000));
});
