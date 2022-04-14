var db = require('../lib//db.js');
const bcrypt = require('bcrypt');
var { nanoid } = require("nanoid");


module.exports = function (app) {

  var passport = require('passport');
  var LocalStrategy = require('passport-local');
  const FacebookStrategy = require('passport-facebook').Strategy;


  app.use(passport.initialize());
  app.use(passport.session());


  passport.serializeUser(function (user, done) {
    console.log('serializeUser', user.id);
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    var user = db.get('users').find({ id: id }).value();
    console.log('deserializeUser', user, id);
    done(null, user); // request.user에 user 데이터가 추가된다. 
  });


  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'pwd'
  },
    function (email, password, done) {
      console.log('LocalStrategy', email, password);
      var user = db.get('users').find({
        email: email,
      }).value();
      if (user) {
        bcrypt.compare(password, user.password, function (err, result) {
          if (result) {
            return done(null, user, {
              message: `welcome!`
            })
          } else {
            return done(null, false, {
              message: `Password is wrong!!`
            })
          }
        })
      } else {
        return done(null, false, {
          message: `there is no such an email!`
        })
      }
    }
  ));

  var facebookCredentials = require('../config/facebook.json');
  facebookCredentials.profileFields = ['id', 'emails', 'name', 'displayName'];

  passport.use(new FacebookStrategy(facebookCredentials,
    function (accessToken, refreshToken, profile, done) {
      console.log('FacebookStrategy', accessToken, refreshToken, profile);
      var email = profile.emails[0].value;
      var user = db.get('users').find({email:email}).value();
      if(user){
          user.facebookId = profile.id;
          db.get('users').find({email:email}).assign(user).write();
      }else{
        user = {
          id: nanoid(),
          email: email,
          displayName: profile.displayName,
          facebookId: profile.id
        }
        db.get('users').push(user).write();
      }
      // User.findOrCreate(..., function(err, user){ // 샘플코드라 주석으로 해놓고 참고만 하자. 
    
      done(null, user); // 첫번째 인자(아무 문제 없다는 의미), 두번째 인자(serializeUser로 넘길 user 객체)
      // });
    }
    // ));
    // }


  ))
  console.log(facebookCredentials);
  app.get('/auth/facebook',
    passport.authenticate('facebook',
    {
      scope: [ 'email', 'user_location' ]
    }
  ));

  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
      failureRedirect: '/auth/login'
    }),

    function(request, response){
      response.redirect('/');
    });


  return passport;
}

