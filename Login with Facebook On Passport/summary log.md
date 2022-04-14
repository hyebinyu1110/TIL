

WEB7 Login with Facebook On Passport 1. 수업소개

- Federated Identity



WEB7 Login with Facebook On Passport 3. 비밀정보 관리
- pm2 start main.js --watch --ignore-watch="session/* db.json" --no-daemon
=> 이 파일들에 대해서는 watch 를 하지않겠다고 해야 쟤들이 수정됐을때, 웹애플리케이션이 main.js가 리로드 되지 않는 것이다. 그리고  --no-daemon이라고 해서 백그라운드가 아닌 foreground로 실행시킴 
- facebook.template.json 형식만 있는 파일을 버전관리하고, facebook.json이라고 하는 데이터가 있는 


<발견한 에러>
- facebook login 시에 자꾸 console.log('FacebookStrategy', accessToken, refreshToken, profile); 결과물이 안생김.

- facebook login 자체가 안되는 상황
- 근 3일간의 삽질을 하니, https:// 스키마로만 페이스북 개발자 앱 설정에 가능한데, 나는 http:// 로 데이터를 받아야 하니 오류가 생겼던 상황이였다.

- 그래서 오류가 뜬 상황에 URI에서 https://에서 http:// 로 변경하면 something broke라는 오류 메시지가 뜬다. 일단은 데이터는 받았다는것(페이스북으로부터)
- http:// 로 데이터를 못받는데 그럼 이걸 어떻게 해결해야 하나
- 그 뒤 터미널 창에 보니 아래의 오류가 떴다.

TypeError: self._verify is not a function
 at C:\Users\HBYU\Desktop\express\node_modules\passport-oauth2\lib\strategy.js:205:24
    at C:\Users\HBYU\Desktop\express\node_modules\passport-facebook\lib\strategy.js:183:5
    at passBackControl (C:\Users\HBYU\Desktop\express\node_modules\oauth\lib\oauth2.js:134:9)
    at IncomingMessage.<anonymous> (C:\Users\HBYU\Desktop\express\node_modules\oauth\lib\oauth2.js:157:7)
    at IncomingMessage.emit (node:events:402:35)
    at endReadableNT (node:internal/streams/readable:1343:12)
    at processTicksAndRejections (node:internal/process/task_queues:83:21)

- 이렇게 에러가 뜬 이유가 코드를 아래와 같이 넣어서 그럼.

  passport.use(new FacebookStrategy(facebookCredentials, {
    profileFields: ["id", "email"],
    authType: 'reauthenticate',
    session: false
  },
    function (accessToken, refreshToken, profile, done) {
      console.log('FacebookStrategy', accessToken, refreshToken, profile);

그래서 아래와 같이 수정해야 함
assport.use(new FacebookStrategy(facebookCredentials,
    function (accessToken, refreshToken, profile, done) {
      console.log('FacebookStrategy', accessToken, refreshToken, profile);
<결론> 
- 안되는 자리에 코드를 잘못 끼어 넣어서 오류가 일어남

- 하지만 큰 문제는 해결하지 못하였다. 페이스북으로부터 https:// 스키마로 데이터를 받는데, 내 앱 자체에서는 https://로 데이터를 받지 못한다는 점 그래서.  session 에 cookie{
secure: true} 로 받는다고 설정했으나 이것도 안됨. 



WEB7 Login with Facebook On Passport 6. email scop
- facebook api email scope 로 구글에 검색하기 

<오류> 
- 아까의 오류를 안고 있는 상황에서 (https:// 리다이렉트 URI로 페이스북이 authorization code를 보내도 내 어플리케이션이 http:// 스키마가 아니라서 데이터를 받지 못하고 오류가 뜨기에 http:// 로 수정해줘야 facebook에서 받은 데이터가 콘솔에 뜨는 오류), scope에 저렇게 email 과 user location을 받지 못하고 있다. 
-   app.get('/auth/facebook',
    passport.authenticate('facebook',
    {
      scope: [ 'email', 'user_location' ]
    }
  ));
- 강의에서 이고잉님은 passport.js facebook email get scope로 구글에 검색해보라함.  
(찾는데 고생하셨다고 함)
- 참조:
https://stackoverflow.com/questions/22880876/passport-facebook-authentication-is-not-providing-email-for-all-facebook-account

- facebookCredentials.profileFields = ['id', 'emails', 'name', 'displayName']; 코드를 passport.use(new FacebookStrategy(facebookCredentials,
    function (accessToken, refreshToken, profile, done) {
      console.log('FacebookStrategy', accessToken, refreshToken, profile);
위에 삽입함. 
- 그러면 아이디, 이메일 , 이름 전체가 콘솔에 출력 됨


WEB7 Login with Facebook On Passport 7. 회원생성
- 이메일이라는 굉장히 중요한 식별자를 얻어 얻어냈으니까, 사용자를 추가하는 구체적인 방법을 살펴보자
- 사용자는 이 db.json이라는 파일에 저장할 것임. 그것을 위해 lowdb를 사용할 것이다. 
- lowdb를 사용하기위해 passport.js에 lowdb를 로드하는 코드를 쓰자. 
- 아래의 코드를 추가 해주니 정상적으로 로그인이 됨(로그인 된 홈 페이지로 감, 닉네임에 내 이름이 들어감)
passport.use(new FacebookStrategy(facebookCredentials,
    function (accessToken, refreshToken, profile, done) {
      console.log('FacebookStrategy', accessToken, refreshToken, profile);
      var email = profile.emails[0].value;
      var user = db.get('users').find({email:email}).value();
      if(user){

      }else{
        user = {
          id: nanoid(),
          email: email,
          displayName: profile.name.displayName,
          facebookId: profile.id
        }
        db.get('users').push(user).write();
      }
    
      done(null, user); // 첫번째 인자(아무 문제 없다는 의미), 두번째 인자(serializeUser로 넘길 user 객체)
  
    }
    


WEB7 Login with Facebook On Passport 8. 회원정보관리
- user가 있는 경우에는 multi user
- 반대의 경우가 있을 수 있다. 페이스북으로 먼저 로그인 되어있는데, 누군가가 이메일로 로그인을 시도한다. 그런 경우에는 패스워드 정보를 추가해야 한다. 그때는 어떻게 해야 하는가?
- 이메일을 입력했다고 그냥 믿는게 아니라 중간에 인증과정이 필요한데, 수업도의 복잡도를 높이지 않기위해 생략
- route폴더의 auth.js 파일로 이동함. 
