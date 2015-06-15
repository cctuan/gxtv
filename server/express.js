
var express = require('express');
var session = require('express-session');
var compression = require('compression');
// HTTP request logger middleware for node.js
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
// CSRF token middleware
var csrf = require('csurf');
// Middleware for handling multipart/form-data.
var multer = require('multer');
// A simple, powerful, and extendable templating engine for node.js and
// browsers, similar to Django, Jinja2, and Twig.
var swig = require('swig');

// MongoDB session store for Express and Connect
var mongoStore = require('connect-mongo')(session);
// Flash message middleware for Connect.
var flash = require('connect-flash');
// A multi-transport async logging library for Node.js
var winston = require('winston');
// View helper methods for expressjs and other node stuff
var helpers = require('view-helpers');
var CONFIG = require('../config');
var pkg = require('../package.json');

var env = process.env.NODE_ENV || 'development';

module.exports = function(app, passport) {
  // Compression middleware (should be placed before express.static)
  app.use(compression({
    threshold: 512
  }));
   // Static files middleware
  app.use(express.static(CONFIG.root));

  // Use winston on production
  var log;
  if (env !== 'development') {
    log = {
      stream: {
        write: function (message, encoding) {
          winston.info(message);
        }
      }
    };
  } else {
    log = 'dev';
  }

  // Don't log during tests
  // Logging middleware
  if (env !== 'test') {
    app.use(morgan(log));
  }

  // Swig templating engine settings
  if (env === 'development' || env === 'test') {
    swig.setDefaults({
      cache: false
    });
  }

  // set views path, template engine and default layout
  app.engine('html', swig.renderFile);
  app.set('views', CONFIG.root);
  app.set('view engine', 'html');
  app.use('/', express.static(__dirname + '/client/dist'));
  // expose package.json to views
  app.use(function (req, res, next) {
    res.locals.pkg = pkg;
    res.locals.env = env;
    next();
  });

  // bodyParser should be above methodOverride
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(multer());
  app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      var method = req.body._method;
      delete req.body._method;
      return method;
    }
  }));

  // CookieParser should be above session
  app.use(cookieParser());
  app.use(cookieSession({ secret: 'secret' }));
  app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: pkg.name,
    store: new mongoStore({
      url: CONFIG.db,
      collection : 'sessions'
    })
  }));

  // use passport session
  app.use(passport.initialize());
  app.use(passport.session());

  // connect flash for flash messages - should be declared after sessions
  app.use(flash());

  // should be declared after session and flash
  app.use(helpers(pkg.name));

  // adds CSRF support
  if (process.env.NODE_ENV !== 'test') {
    // app.use(csrf());

    // This could be moved to view-helpers :-)
    app.use(function (req, res, next) {
      //res.locals.csrf_token = req.csrfToken();
      next();
    });
  }
};
// TODO: use csrf to prevent POSTMAN like robot.
