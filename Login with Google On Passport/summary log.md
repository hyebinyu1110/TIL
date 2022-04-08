
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

WWEB7 Login with Google On Passport 4. Resource Owner 인증절차
- 개발자도구 network 탭, 페이지가 바뀌어도 서버와 접속했던 로그를 유지한다. 
- network 탭 google log 를 클릭하면(/auth/google 클릭시), 
Location: 
https://accounts.google.com/o/oauth2/v2/auth?response_type=code&redirect_uri=https%3A%2F%2Flocalhost%3A3000&scope=email%20profile&client_id=291985062118-9jp3fvajujsu0vt5g1ea5vuubqof6l6t.apps.googleusercontent.com
-  response 헤더에 가면 위의 link를 passport가 우리대신 만들어 준것, 구글의 사용설명서를 passport의 strategy 개발자가 열심히 연구해서. 그러면, 리다이렉션을 시켰기 때문에 사용자는 이 주소로  방문하게 되고, 이 주소는 사용자가 로그인되어있는지 아닌지 를 확인하는 화면으로 가게됨 
<발생한 에러>
- 400 오류: redirect_uri_mismatch
<해결방법>
- google cloud platform 에 authorized redirect url 등록시 스키마에 https://가 아니라 http:// 로 등록해야 저 에러가 해결된다. 

WEB7 Login with Google On Passport 6.1. 사용자추가
- 구글에 검색 google profile email scope
- 참조: https://developers.google.com/people/v1/how-tos/authorizing

WEB7 Login with Google On Passport 7. 수업을 마치며
- 로그인과정에서 access Token 을 받았으니, 이를 이용해, 구글의 여러서비스를 API를 이용해 제어해보는 것입니다. 거기에는 완전히 다른 산맥이 기다리고 있겠죠? 이를 위해, 우리가 알아야할 지식들

- 우리의 웹서버가 클라이언트가 되어서 구글 서버에 여러정보를 요청해야 한다. 구글이 자사의 서비스를 쉽게 제어할 수 있도록 제공하는 라이브러리인 SDK 이나,또는 nodejs 의 공식 라이브러리인 HTTP 모듈이나, 혹은 저명한 nodejs 의 모듈인 request 를 이용하면 된다.  이걸 이용하면 나중에 크롤러 같은 것도 만들 수 있다.  또 인증은 보안이 극도로 요구되는 분야입니다. 어떤 보안적인 이슈는 지식을 좀 알고 있어야 해결할 수 있지만 많은 경우, 좋은 습관, 솔루션을 사용하는 것 만으로도 자신도 모르게 보호되는 것이 많다. 
- 그 중에 가장중요한 것은 https  사용하는 것이다. authorization code 나 access token  또 , client secret 과 같이 누군가에게 모니터링 되면 절대로 안되는 정보가, 누군가에 의해 쉽게 관찰되고, 있다고 생각해보세요 끔찍하죠. HTTPs 는 이런 위협으로부터 우리를 보호해 줍니다. 그 외에도 보안적인 부분에 대한 학습은 꾸준히 해야 한다. 
- 지금까지 우리는 사용자의 편의성과 보안성을 동시에 잡는 방법인 federated identity의 구글 인증버전을 살펴보았습니다. 구글의 api를  사용할수 있는 발판도 만들었다.  
- 여기까지 오신다고 수고 많으셨습니다. 축하드려요 
