
var mongoose = require('mongoose');
var User = mongoose.model('User');
var utils = require('../utils');

/**
 * Load
 */
exports.load = function (req, res, next, id) {
  var options = {
    criteria: { _id : id }
  };
  User.load(options, function (err, user) {
    if (err) return next(err);
    if (!user) return next(new Error('Failed to load User ' + id));
    req.profile = user;
    next();
  });
};

exports.remove = function (req, res) {
  User.remove(req.body, function(err) {
    if (err) {
      res.json({
        error: 'cannot remove.'
      });
    } else {
      res.json({
        success: 'removed'
      });
    }
  });
};

/**
 * Create user
 */
exports.create = function (req, res) {
  var user = new User(req.body);
  user.provider = 'local';
  user.save(function (err) {
    if (err) {
      return res.json({
        error: utils.errors(err.errors),
        user: user,
        title: 'cannot create'
      });
    }

    // manually login the user once successfully signed up
    req.logIn(user, function(err) {
      if (err) req.flash('info', 'Sorry! We are not able to log you in!');
      return res.json({
        user: user,
        title: 'login'
      });
    });
  });
};

/**
 *  Show profile
 */

exports.show = function (req, res) {
  var user = req.user;
  res.json({
    title: user.name,
    user: user
  });
};

exports.signin = function (req, res) {};

/**
 * Auth callback
 */

exports.authCallback = login;
/**
 * Show login form
 */

exports.login = function (req, res) {
};

/**
 * Show sign up form
 */

exports.signup = function (req, res) {
  if (req.session.user) {
    res.json({
      user: req.session.user,
      title: 'login'
    });
  } else {
    res.json({
      title: 'need-login'
    });
  }
};
/**
 * Logout
 */
exports.logout = function (req, res) {
  req.session.destroy(function() {
    req.logout();
    res.json({success: 'User sucessfully logged out'});
  });
};

/**
 * Session
 */

exports.session = login;

/**
 * Login
 */

function login (req, res) {
  var redirectTo = req.session.returnTo ? req.session.returnTo : '/';
  delete req.session.returnTo;
  res.redirect(redirectTo);
};