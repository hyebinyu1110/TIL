1. 비밀번호를 평문으로 저장하는 것은 죄, 비밀번호는 해시나 비밀번호 암호화라는 주제로 검색해서 정보를 관리하는 관리자들도 볼 수 없게 반드시 암호화해야 한다.
2. 여기서는 한 사람의 정보만 다루지만, 여러 사람의 로그인 정보를 다루는 방법도 생각해보면 좋다.
3. 세션은 데이터베이스에 저장하는게 훨씬 바람직

WEB5 - Express Passport.js 1. 수업소개
- 

2. passport 설치
-passport는 배우기는 무척 어렵지만, 사용하기 편리하다. 배우기도 쉬운데 사용하기도 쉬운건 누구나 할 수 있는 것. 그래서 passport는 해볼만 하다. 하지만 어렵다는 것 미리 말해둠. 
-  passport는 session 코드 다음에 와야 함. 

- 우리의 목표는 이해하는게 아니라 익숙해지는것 이기 때문에 시키는 대로 일단 하면 된다. 

- passport 배우면서 마주친 에러 사항 글 적기
1. 안녕하세요. 저 같이 4.1. passport 자격확인 1 강의 중 console.log('LocalStrategy', username, password); 코드가 포함된 콜백함수가 실행되지 않는 분이 있을까 싶어 코멘트를 답니다. 저도 console.log가 안되어 계속 써칭하였습니다. 아래 다른분들 코멘트 중 bodyParser = require("body-parser"); 모듈이 꼭 필요하다는 말이 나옵니다. 왜냐면 post로 받은 body부분을 request 객체에 body 속성으로 추가해줘야 하니까요. 그러러면 app.use(bodyParser.urlencoded({ extended: false })); 이 코드가 passport 모듈을 초기화 하는 코드 줄 보다 위에 와야 합니다. 그래야 passport 모듈에서 body 속성에 접근이 가능하기 때문입니다. 부족하지만 설명해 보았습니다. 제 설명이 100%맞는 설명인지는 모르겠지만, 제가 이해한 바를 토대로 이렇게 글을 남깁니다. 저같은 경우를 가진 다른 분들께 도움이 되길 바랍니다! 모두들 화이팅입니다!


2. app.post('/auth/login_process', // 로그인 폼에서 auth/login_process로 전송한 데이터를 passport가 받도록 함. 그 때 전송된 데이터는 local 전략(id와 password로 로그인하는 전략으로 처리하겠다.)   
passport.authenticate('local', { failureRedirect: '/login' }),
function(request, response) {
  request.session.save(function(){
    response.redirect('/');
  })
});

3. 로그인 성공시 flash 메시지 띄우려면 이렇게 코드 짜야함.
if(password === authData.password){
        console.log('2');
        return done(null, authData,{
          message: 'Welcome!' // 이 코드가 추가되어야함
        });





























6. passport 로그인 확인

- var passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy;
=> passport 설치

-----------------------------------------------------------------
  app.use(passport.initialize()); // express 호출될때마다 passport가 express에 개입// passport 사용하겠다. 
  app.use(passport.session()); // passport 사용하면서, session 을 사용할 것임 , passport는 session을 토대로 그 위에서 동작

=> express 에 설치, session 을 쓰겠다고 함
-----------------------------------------------------------------
passport.serializeUser(function(user, done) { // serializeUser는 로그인에 성공했을 때 (딱 한번만 호출됨) 로그인 성공 사실을 세션스토어에 저장하는 기능을 하는 것이 serializeUser이다. 
    console.log('serializeUser', user)
    done(null, user.email); // user 식별자로 email 줌
    // done(null, user);
  });

=> login 에 성공했을 때, sessionstore 에 저장하는 방법 정의 
-----------------------------------------------------------------
  passport.deserializeUser(function(user, done) {
    console.log('deserializeUser', user);
    done(null, authData);
  });

=> 페이지에 방문할 때마다 sessionstore에 있는 식별자를 가져와서, 식별자 기준으로 해서 사용자의 실제, 우리가 애플리케이션을 사용할 데이터를 가져오는 방법을 정의 한것 
-----------------------------------------------------------------
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'pwd',
  } 
,function (username, password, done) {
    if(username === authData.email){
      console.log('1');
      if(password === authData.password){
        console.log('2');
        return done(null, authData);
      }else{
        console.log('3');
        return done(null, false,{
          message: 'Incorrect password'
        }); 
      }
    }else{
      console.log('4');
      return done(null, false, {
        message: 'Incorrect email'
      }); 
    }
  }
)); 

=> 로그인에 성공했는지 실패했는지 판별하는 코드
-----------------------------------------------------------------
app.post('/auth/login_process', // 로그인 폼에서 auth/login_process로 전송한 데이터를 passport가 받도록 함. 그 때 전송된 데이터는 local 전략(id와 password로 로그인하는 전략으로 처리하겠다.)   
passport.authenticate('local', { failureRedirect: '/login' }),
function(request, response) {
  request.session.save(function(){
    response.redirect('/');
  })
});=> 사용자가 전송한 데이터를 받았을 때, 우리가 어떻게 처리할 것인가




8. flash message
- 
10. 리팩토링
- 이 부분이 제일 어려움

11. 수업을 마치며
- passport의 가치는 300여개에 이르는 인증전략에서 나옵니다. 현실로 위험한 일로 가득차 있죠. 이런 현실 위에서 나쁜 일들과 다퉈야 하는 인증시스템은 자연스럽게 고도로 복잡하고, 복잡성을 제대로 핸들링 하지 못한다면, 극도로 위험해 질 수 있다. 이런 복잡성과 위험성을  보안전문가가 아닌 사람이 감당하는 것은 쉽지 않은 일이다. 전문가가 만들어놓은 인증전략을 이용하면, 구글, 페이스 북과 같은 계정을 이용해서 인증기능을 쉽게 구현 할 수 있습니다.이러한 인증방식은 federated identity를 이용하면 회원정보를 직접 보관하는 것이 아니라, 구글 페이스북과 같이 유명한 서비스에게 사용자가 이 사용자가 맞는지 물어보는 것을 통해 인증을 결정함. 
- API, 이러한 회사들이 가지고있는 인프라의 정보를 사용하거나, 그 인프라를 조작하는 접점을 API라고 한다. API를 접근 하는 것은 오늘날 매우 중요한 일이 되고 있다. 인증 시스템이 필요한데, FI 가 API에 접근할 수 있는 권한을 부여하는 역할을 많이 하고 있음. FI의 중요성은 갈수록 커질것이다. 
