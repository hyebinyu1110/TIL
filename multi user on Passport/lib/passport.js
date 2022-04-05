var passport = require('passport');
var LocalStrategy = require('passport-local');
var db = require('../lib//db.js');
const bcrypt = require('bcrypt');
  
module.exports = function(app){

    app.use(passport.initialize());
    app.use(passport.session());

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
    ))
    passport.serializeUser(function(user, done) {
      console.log('serializeUser', user.id);
      done(null, user.id);
    });            
    
    passport.deserializeUser(function(id, done) {
      var user = db.get('users').find({id:id}).value();
      console.log('deserializeUser', user, id);
      done(null, user);
    });    
        
   

    return passport;
}
