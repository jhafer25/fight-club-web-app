module.exports = (app, passport, user, express, router) => {
  // app.get('/', (req, res) => {
  //   res.render('index');
  // });
  const User = user;
  app.get('/', function(req, res) {
    User.findAll()
    .then(function(users) {
      res.render('index', {
        users: users
      });
    });
  });

  app.get('/fightMatcher', (req, res) => {
    res.render('fightMatcher');
  });
  app.get('/signup', (req, res) => {
    res.render('signup');
  });

  app.get('/signin', (req, res) => {
    res.render('signin');
  });

  app.post(
    '/signup',
    passport.authenticate('local-signup', {
      successRedirect: '/',
      failureRedirect: '/signup'
    })
  );

  app.get('/home', isLoggedIn, (req, res) => {
    res.render('home');
  });

  app.get('/logout', (req, res) => {
    req.session.destroy(err => {
      res.redirect('/');
    });
  });

  app.post(
    '/signin',
    passport.authenticate('local-signin', {
      successRedirect: '/',
      failureRedirect: '/signin'
    })
  );

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();

    res.redirect('/signin');
  }
};
