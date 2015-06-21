
var mongoose = require('mongoose');
var Video = mongoose.model('Video');
var utils = require('../utils');
var searcher = require('../searchers/search_manager');

searcher.init();

/**
 * Load
 */
exports.load = function (req, res, next, id) {
  var options = {
    criteria: { _id : id }
  };
  Video.load(options, function (err, video) {
    if (err) return next(err);
    if (!user) return next(new Error('Failed to load video ' + id));
    req.profile = video;
    next();
  });
};

exports.remove = function (req, res) {
  Video.remove(req.body, function(err) {
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
// TODO
/**
 * Create user
 */
exports.search = function (req, res) {
  console.log(req);
  var queryString = req.query.q;
  searcher.search(queryString).then(function(result) {
    res.json({
      data: result || []
    });
  }).catch(function() {
    res.json({
      data: []
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

exports.showAll = function(req, res) {
  User.load({}, function (err, users) {
    var result;
    if (err) {
      res.json({
        data: []
      });
      return;
    }
    if (!users || users.length === 0) {
      res.json({
        data: []
      });
      return;
    }
    res.json({
      data: users
    });
    return;
  });
};

