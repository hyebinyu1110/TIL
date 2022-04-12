# passport-google-oauth20

- 참조: [passport-google-oauth20 on gitgub](https://github.com/jaredhanson/passport-google-oauth2)


 ## passport-google-oauth20
    - OAuth 2.0을 이용하는 구글로 인증 하는 Passport 전략
    - 이 모듈은 당신의 Node.js 애플리케이션에서 구글로 인증하게 할 것입니다. 모듈을 Passport로 플러그인 함으로써(모듈을 장착함으로서 Passport 기능 확장),
     구글 인증은 쉽고, 드러나지 않으면서 Express를 포함하여 Connect-Style을 지원하는 어떤 애플리케이션이나 프레임워크로 통합될 수 있습니다.
     
 ## Install
    $ npm install passport-google-oauth20
 ## TypeScript support
    $ npm install @types/passport-google-oauth20

## Usage
 ### Register Application
    - Google 전략은 사용자의 구글 계정을 이용하여 사용자를 인증한다. 당신의 애플리케이션이 Google의 인증시스템을 사용할 수 있기전에, 
    - 당신은 무조건 먼저 당신의 애플리케이션이  Google APIs로 OAuth 2.0을 사용하도록 등록해야 한다. 
    - 일단 등록이 되면, client ID와 client Secret이 발급된다. 발급된 client ID와 client Secret은 Google 이 당신의 어플리케이션을 식별하도록 사용된다. 
    - 등록하기위해서는, 아래의 단계를 완성해야 한다.
    
    - 'Google Cloud Platform console' 페이지로 간다.
    - 프로젝트 리스트 중에서 프로젝트를 선택하거나 아니면, 새로운 프로젝트를 생성한다.
    - APIs & Services page 로 이동하여 Credentials(신원확인)을 선택한다.
    - 만약 당신이 기존의 애플리케이션을 가지고 있다면(구글 계정에 등록된), OAuth 2.0 Client IDs 항목 아래에 보여질 것입니다. 
    - client ID and secret를 획득하기 위해 dit OAuth client를 클릭한 후, strategy를 설정하기 위해 계속 진행하십시오(authorized redirect URI를 적거나).
    - 아니며 continue를 누르십시오
    
    - 만약, 위의 사항을 이미 끝냈다면, OAuth consent screen 을 설정하세요(사용자가 애플리케이션을 통해 구글 계정에 로그인할 때, 애플리케이션이 사용자의 구글계정을
     통해 사용하도록 허용하는 사항을 선택하는 화면 설정하도록).
     - 구글계정을 가진 어떤 사용자에게든지 당신의 애플리케이션이 이용가능하도록 하게 하기위해 'External'을 선택하세요. 
     - app 이름, support email, 개발자 연락처 정보등을 기입함으로서 애플리케이션 등록 절차를 완료 하세요.
     
     - Credentials를 생성을 클릭 한 후,  OAuth client ID를 선택하세요
     - Web application을 애플리케이션 타입으로 선택하세요
     
     - Authorized Redirect URIs 아래에 있는 Add URI를 클릭한 후, 당신의 애플리케이션의 OAuth 2.0 redirect endpoint의 URI를 입력하세요.
     - 구글 계정을 통해 어플리케이션을 가입하거나 로그인 한후, 리다이렉트 될 애플리케이션의 최종경로를 입력한다.
     - 만약 당신이 example app을 사용한다면, ttp://localhost:3000/oauth2/redirect/google을 입력하세요.
     
     - OAuth client를 생성하기위해 Create를 클린하세요. 다음에 나오는 페이지는 당신의 client ID와 secret 를 보여줄 것입니다.
     - strategy를 설정하기위해 계속 진행하세요.
     
     

### Configure Strategy
     - 일단 당신의 애플리케이션을 등록했으면, strategy는 Oauth 2.0 리다이렉트 최종목적지와 함께, 당신의 애플리케이션의 client ID와 
       secret으로 설정될 필요가 있습니다.
      (strategy는 애플리케이션상 passport가 사용자를 인증할때 사용하는 방식이고, OAuth 2.0 보안방식으로 구글계정에 로그인할 때
      사용될 Passport상 new GoogleStrategy 부분에 client ID와 secret 정보를 애플리케이션에 기록하기)
     
     - strategy는 인수로서, verify 함수를 취하고, verifty 함수는 accessToken, refreshToken, and profile 을 인자로서 받아들입니다.
     - accessToken 과 refreshToken은 API 접근을 위해 사용되며, 인증을 위해선 필요되지 않습니다.
     - profile은 구글 계정에 저장된 사용자의 profile 정보를 포함합니다.
     - 사용자를 인증할 때, 이 strategy는 일련의 Google에 대한 API 요청들과 리다이렉트들을 통하여 이 정보(사용자의 profile 정보)를 얻기위해 
       Oauth 2.0 프로토콜을 사용합니다.
       
     - verify 함수는 사용자가 어느 구글 계정에 속한지 결정하기 위한 책임이 있습니다. 
     - 계정이 처음으로 로그인 되는 경우에는, 새로운 사용자 기록이 대체로 자동적으로 생성됩니다.
     - 그 다음 로그인 부터는, 기존의 사용자 기록은 그것의 구글 계정과의 관계성을 통하여 발견될겁니다.

     - verify 함수는 어플리케이션에 의해 제공되기 때문에, 어플리케이션이 선택하는 어떤 데이터를 쓸수 있습니다.
     - 아래의 예시는 SQL 데이터베이스의 사용을 자세히 보여줍니다.
     
~~~Java Script
var GoogleStrategy = require('passport-google-oauth20');

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: 'https://www.example.com/oauth2/redirect/google',
    scope: [ 'profile' ],
    state: true
  },
  function(accessToken, refreshToken, profile, cb) {
    db.get('SELECT * FROM federated_credentials WHERE provider = ? AND subject = ?', [
      'https://accounts.google.com',
      profile.id
    ], function(err, cred) {
      if (err) { return cb(err); }
      if (!cred) {
        // The account at Google has not logged in to this app before.  Create a
        // new user record and associate it with the Google account.
        db.run('INSERT INTO users (name) VALUES (?)', [
          profile.displayName
        ], function(err) {
          if (err) { return cb(err); }

          var id = this.lastID;
          db.run('INSERT INTO federated_credentials (user_id, provider, subject) VALUES (?, ?, ?)', [
            id,
            'https://accounts.google.com',
            profile.id
          ], function(err) {
            if (err) { return cb(err); }
            var user = {
              id: id,
              name: profile.displayName
            };
            return cb(null, user);
          });
        });
      } else {
        // The account at Google has previously logged in to the app.  Get the
        // user record associated with the Google account and log the user in.
        db.get('SELECT * FROM users WHERE id = ?', [ cred.user_id ], function(err, user) {
          if (err) { return cb(err); }
          if (!user) { return cb(null, false); }
          return cb(null, user);
        });
      }
    };
  }
));
~~~

### Define Routes
    - 2개의 라우트들이 사용자가 그들의 구글 계정으로 로그인하도록 필요합니다.
    - 첫번째 라우트들은 Google 페이지로 사용자를 리다이렉트 하는데, 2개의 라우트 들은 아래를 인증합니다. 
    :
    
~~~Java Script
app.get('/login/google', passport.authenticate('google'));
~~~

    - 두번째 라우트는 인증 응답을 처리하고, 사용자가 로그인되게 합니다. 그 뒤 Googleㅇ은 사용자를 다시 어플리케이션으로 이동시킵니다.
    : 
~~~Java Script

app.get('/oauth2/redirect/google',
  passport.authenticate('google', { failureRedirect: '/login', failureMessage: true }),
  function(req, res) {
    res.redirect('/');
  });
  
~~~

##  Documentation
    - OAuth 2.0을 사용하여 Google APIs 로  당신의 애플리케이션을 통합하는것에 대한 더 많은 정보를 위해 google APIs에 접근하도록 Using OAuth 2.0 을 참조하여 주세요. 


## Examples
[odos-express-google-oauth2](https://github.com/passport/todos-express-google-oauth2)

- 위의 예시가 어떻게 Express 애플리케이션 내에서 Google strategy를 사용하는지 설명합니다.


## icense
The MIT License

Copyright (c) 2012-2022 Jared Hanson <https://www.jaredhanson.me/>
