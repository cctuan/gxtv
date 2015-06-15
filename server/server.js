var express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    methodOverride = require('method-override');

var fs = require('fs');
var CONFIG = require('./../config');
var cookieParser = require('cookie-parser');
var passport = require('passport');

var app = express();
var port = process.env.PORT || 3000;

var connect = function () {
  var options = { server: { socketOptions: { keepAlive: 1 } } };
  mongoose.connect(CONFIG.db, options);
};
connect();

mongoose.connection.on('error', console.log);
mongoose.connection.on('disconnected', connect);

// Bootstrap models
fs.readdirSync(__dirname + '/models').forEach(function (file) {
  if (~file.indexOf('.js')) {
    require(__dirname + '/models/' + file);
  }
});

// Bootstrap passport config
require('./passport')(passport);

// Bootstrap application settings
require('./express')(app, passport);
// Bootstrap routes
require('./routes')(app, passport);

app.listen(port);

module.exports = app;
