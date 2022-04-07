
WEB7 Login with Google On Passport 1.수업소개

- passport.js 위에서 구글 로그인 기능을 구현하는 방법을 살펴본다.
- 


WEB7 Login with Google On Passport 2. 프로젝트등록
- 여러분이 만드는 애플리케이션 하나가 프로젝트 하나라고  생각. 프로젝트마다 클라이언트 아이디와, 클라이언트 시크릿을 받아야 한다. 

WEB7 Login with Google On Passport 3. passport설정
- 소스코드에다가 이렇게 Client ID, Client Secret 을 넣는건 올바르지 않는 방법. 
- 버전관리를 하면 남에게 코드가 보여짐
- config라는 디렉터리 만들기 
- 버전관리는 google.template.json 으로만 하고, google.json 파일은 절대로 버전관리 하지 말아야 한다. 
- 깃을 쓴다면, gitignore 에다가 
config/google.json을 써 놓을 것

WEB7 Login with Google On Passport 4. Resource Owner 인증절차
- 개발자도구 network 탭, 페이지가 바뀌어도 서버와 접속했던 로그를 유지한다. 
- network 탭 google log 를 클릭하면(/auth/google 클릭시), 
Location: 
https://accounts.google.com/o/oauth2/v2/auth?response_type=code&redirect_uri=https%3A%2F%2Flocalhost%3A3000&scope=email%20profile&client_id=291985062118-9jp3fvajujsu0vt5g1ea5vuubqof6l6t.apps.googleusercontent.com
-  response 헤더에 가면 위의 link를 passport가 우리대신 만들어 준것, 구글의 사용설명서를 passport의 strategy 개발자가 열심히 연구해서. 그러면, 리다이렉션을 시켰기 때문에 사용자는 이 주소로  방문하게 되고, 이 주소는 사용자가 로그인되어있는지 아닌지 를 확인하는 화면으로 가게됨 
<발생한 에러>
- 400 오류: redirect_uri_mismatch
<해결방법>
- google cloud platform 에 authorized redirect url 등록시 스키마에 https://가 아니라 http:// 로 등록해야 저 에러가 해결된다. 

