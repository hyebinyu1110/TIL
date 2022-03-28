module.exports = function(app){
    
    var authData = {

        email: 'hyebinyu1110@gmail.com',
        password: '6362488',
        nickname: 'hyebinyu1110'
      }

    var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;  
  
    app.use(passport.initialize()); // express 호출될때마다 passport가 express에 개입// passport 사용하겠다. 
    app.use(passport.session()); // passport 사용하면서, session 을 사용할 것임 , passport는 session을 토대로 그 위에서 동작
  
    passport.serializeUser(function(user, done) { // serializeUser는 로그인에 성공했을 때 (딱 한번만 호출됨) 로그인 성공 사실을 세션스토어에 저장하는 기능을 하는 것이 serializeUser이다. 
      console.log('serializeUser', user)
      done(null, user.email); // user 식별자로 email 줌
      // done(null, user);
    });
  
    
    // 로그인이 되면 페이지 방문할 때마다, 이 컬백이 호출되도록 약속이 되어있음. authData에서 사용자의 실제정보를 가져옴
    // 사용자가 로그인한 후 각각의 페이지 아무데나 방문할 때마다 우리는 그 사람이 로그인한 사용자인지 아닌지 체크해야 하는데 그걸 체크할 때 , passport 는 저장된 데이터를 기준으로 해서 우리가 필요한 정보를 조회할때 사용하는 것이 deserializeUser이다. 그래서 그 사용자의 실제 정보를 authData에 넣었음.  
    passport.deserializeUser(function(user, done) {
      done(null, authData);
    });
  
  passport.use(new LocalStrategy({
      usernameField: 'email',
      passwordField: 'pwd',
    }
  ,function (username, password, done) {
      if(username === authData.email){
        if(password === authData.password){
          return done(null, authData,{
            message: 'Welcome!'
          });
        }else{
          return done(null, false,{
            message: 'Incorrect password'
          }); 
        }
      }else{
        return done(null, false, {
          message: 'Incorrect email'
        }); 
      }
    }
  ));
  
return passport;
}

