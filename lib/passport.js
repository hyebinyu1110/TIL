var passport = require('passport');
var LocalStrategy = require('passport-local');
var db = require('../lib//db.js');


var authData = {
    email: 'hyebinyu1110@gmail.com',
    password: '6362488',
    nickname: 'hyebinyu1110'
  }
  
module.exports = function(app){

    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser(function(user, done) {
      console.log('serializeUser', user);

      done(null, user);
    });            
    
    passport.deserializeUser(function(id, done) {
      var user = db.get('users').find({id:id}).value();
      console.log('deserializeUser', id, user);
      done(null, user);
    });    
        
 
    passport.use(new LocalStrategy({
      usernameField: 'email',
      passwordField: 'pwd'
    },
    function(username, password, done) {
      console.log('LocalStrategy', username, password);
    if(username === authData.email){
      if(password === authData.password){
        done(null, authData,{
          message: `welcome!`
        })
      }else{
        done(null, false, {
          message: `Incorrect password!`
        })
      }
    }else{
      done(null, false, {
        message: `Incorrect email!`
      })
    }
    }
    ))
    
   

    return passport;
}
