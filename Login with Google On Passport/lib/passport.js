var db = require('../lib//db.js');
const bcrypt = require('bcrypt');


module.exports = function(app){

var passport = require('passport');
var LocalStrategy = require('passport-local');
var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

    app.use(passport.initialize());
    app.use(passport.session());


    passport.serializeUser(function(user, done) {
      console.log('serializeUser', user.id);
      done(null, user.id);
    });            
    
    passport.deserializeUser(function(id, done) {
      var user = db.get('users').find({id:id}).value();
      console.log('deserializeUser', user, id);
      done(null, user);
    });    
        
       
    passport.use(new LocalStrategy({
      usernameField: 'email',
      passwordField: 'pwd'
    },
    function(email, password, done) {
      console.log('LocalStrategy', email, password);
      var user = db.get('users').find({
        email: email, 
      }).value();
      if(user){
        bcrypt.compare(password, user.password, function(err, result){
         if(result){
            return done(null, user,{
          message: `welcome!`
        })
         } else{
          return done(null, false, {
            message: `Password is wrong!!`
          })
         } 
        })
      }else{
        return done(null, false, {
          message: `there is no such an email!`
        })
      }
    }
    ));

var googleCredentials = require('../config/google.json');
console.log(googleCredentials);
    
passport.use(new GoogleStrategy({
  clientID: googleCredentials.web.client_id,
  clientSecret: googleCredentials.web.client_secret,
  callbackURL:  googleCredentials.web.redirect_uris[0]
},
function(accessToken, refreshToken, profile, done) {

  console.log('GoogleStrategy',accessToken, refreshToken, profile);

  // User.findOrCreate({ 
  //   googleId: profile.id 
  // }, function (err, user) {
  //   return done(err, user);
  // });
}
));

app.get('/auth/google', // 사용자가 이 링크로 가면 인증과정을 거치게 해준다는 뜻이니까 구글로 로그인 하는 버튼을 만들어줘야함 
  passport.authenticate('google',  {
     scope: // 우리가 사용자에게 요청할 리소스상의 기능들 
      [ 'email', 'profile' ] 
    }));

app.get( '/auth/google/callback',
    passport.authenticate( 'google', {
       failureRedirect: '/auth/login'
}),

function(request, response){
  response.redirect('/');
});

    return passport;
}

