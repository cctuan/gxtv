
var users = require('./controllers/users');
var videos = require('./controllers/videos');

module.exports = function(app, passport) {

  // user routes
  app.get('/', function(req, res) {
    res.render('client/dist/index.html');
  });
  app.get('/api/auth/login', users.login);
  app.get('/api/auth/logout', users.logout);
  app.get('/api/auth/signup', users.signup);
  app.post('/api/users', users.create);
  app.get('/api/users/:userId', users.show);
  app.get('/api/users', users.showAll);

  app.post('/api/users/session',
    passport.authenticate('local', {
      failureRedirect: '/login',
      failureFlash: 'Invalid email or password.'
    }), users.session);

  
  app.param('userId', users.load);
  app.get('/api/videos/search', videos.search);
};
