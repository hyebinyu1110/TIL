

WEB7 Login with Facebook On Passport 1. 수업소개

- Federated Identity



WEB7 Login with Facebook On Passport 3. 비밀정보 관리
- pm2 start main.js --watch --ignore-watch="session/* db.json" --no-daemon
=> 이 파일들에 대해서는 watch 를 하지않겠다고 해야 쟤들이 수정됐을때, 웹애플리케이션이 main.js가 리로드 되지 않는 것이다. 그리고  --no-daemon이라고 해서 백그라운드가 아닌 foreground로 실행시킴 
- facebook.template.json 형식만 있는 파일을 버전관리하고, facebook.json이라고 하는 실제 데이터가 있는 파일은 git을 쓴다고 하면, gitignore라고 하는 파일을 통해, 저 파일을 무시하도록 처리함. 안그러면 얘까지 버전관리가 됨. 

WEB7 Login with Facebook On Passport 4. Resource Owner 인증절차
- network 탭에 Location 을 보면 facebook 의 사용설명서를 우리가 연구해서 아래의 주소를 만들어내야 하는데 그걸 passport가 대신 만들어줌 
(https://www.facebook.com/v3.2/dialog/oauth?response_type=code&redirect_uri=http://localhost:3000&client_id=324120586370672)
- app.get('/auth/facebook', passport.authenticate('facebook'));
- 위의 코드는 로그인 버튼을 클릭했을때, 사용자가 페이스북으로 이동해야 하는데, 그 이동할 주소를 만들어 주는 코드이다. 것이 핵심이다.
