
WEB2 - OAuth 2.0 : 1.수업소개
- web 기술을 잘 모른다면 web1 수업을 먼저 들을것을 권유. 
- Oauth는 PHP, Node.js, Ruby, Python, Java 같은 기술을 이용해서 구현되는 기술이기에, 애플리케이션 기술들이 익숙하지 않다면, 이번영상의 Oauth 가 무엇인지에 대한 이야기만 듣고, 실제 공부는 미래로 유보하는것이 좋음.
-Oauth의 이러한 특징을 이용한다면 회원들의 아이디와 비번을 처음부터 보관하지 않고, 회원을 식별할 수 있는 기능을 구현할 수 있습니다. Federated Identity 이것의 가장 기반이 되는 기술이 Oauth입니다. 

WEB2 - OAuth 2.0 : 2. 역할
- Their : Resource Server(데이터를 가지고 있는 서버)
- User: Resource Owner
- mine: Client( 우리의 서비스를 저 리소스 서버에 접속해서 정보를 가져가는 클라이언트라는 뜻에서, 클라이언트라고 부른다.)
- Authorization Server:  인증과 관련된 처리를 전담하는 서버이고, 공식 매뉴얼에서는 저 2가지를 구분해서 보여주지만 우리는 그냥 합쳐서 리소스 서버라고 해서 좀 더 간략하게 설명을 한다. 

WEB2 - OAuth 2.0 : 3. 등록
- 클라이언트가 리소스 서버를 이용하기 위해서는 리소스 서버의 승인을 사전에 받아놔야 한다. 그걸 등록이라고 한다. 등록하는 방법을 살펴본다. 
- Client ID, Client Secret, Authorized redirect URI 3개 받음
- Client ID:우리가 만들고 있는 애플리케이션을 식별하는 식별자 아이디
- Client Secret: 그것에 대한 비밀번호 , 외부에 절대 노출되면 안됨
- Authorized redirect URIs: 리소스가 권한을 부여하는 과정에서 authorized code를 전달해주면(리소스 서버) 그때에, 이 주소로 전달해 주세요, 클라이언트가 알려준것
- 그러면 리소스 서버는 저 주소 말고 다른 데서 요청하면 무시함  


WEB2 - OAuth 2.0 : 4. Resource Owner의 승인
- https://urldecode.org/ : url 코드를 보기좋게 번역해줌. 

WEB2 - OAuth 2.0 : 5. Resource Server의 승인
- 3자간의 일, authorization code(임시비밀번호)를 resource server 는 resource owner에게 전송
- Location: https://client/callback?code=3 으로 이동하라고 리소스 서버가 리소스 오너 웹브라우저에게 명령함 
- 리소스 웹브라우저에게 받은 authorization code와 함께 클라이언트는 리소스 서버에 client secret 도 함께 전송함. 
- 클라이언트로 받은 정보가 서버가 가지고 있는 정보와 동일하면, access token 을 발급해줌. 

WEB2 - OAuth 2.0 : 6. 액세스 토큰 발급
- Oauth 의 목적이 access token 을 발급하는 것이다. 
-  authorization code을 통해 인증을 했기에, 서버와 클라이언트는 이 코드값을 지워야지 다시 인증을 안한다. 
- 이제야 리소스 서버는  access token을 발급하여 클라이언트에게 전송한다. 
- access token 을 가진 클라이언트를 보고, 리소스 서버는 B,C 작업, user id =1 에 해당하는 정보에 대해서 액세스 토큰을 가진 클라이언트에게 허용하고 동작

WEB2 - OAuth 2.0 : 7. API 호출
- 우리를 사용하려면 알려주는 방식대로 하라는게 API
- 리소스 서버를 호출하는 그 접점에 있는 일종의 조작장치들을 API라고 한다. 
- 예) google calendar API 
- https://www.googleapis.com/calendar/v3/users/me/calendarList/calendarId 을 URI 에 치면 이런 코드가 나옴
{
  "error": {
    "code": 401,
    "message": "Request is missing required authentication credential. Expected OAuth 2 access token, login cookie or other valid authentication credential. See https://developers.google.com/identity/sign-in/web/devconsole-project.",
    "errors": [
      {
        "message": "Login Required.",
        "domain": "global",
        "reason": "required",
        "location": "Authorization",
        "locationType": "header"
      }
    ],
    "status": "UNAUTHENTICATED",
    "details": [
      {
        "@type": "type.googleapis.com/google.rpc.ErrorInfo",
        "reason": "CREDENTIALS_MISSING",
        "domain": "googleapis.com",
        "metadata": {
          "service": "calendar-json.googleapis.com",
          "method": "calendar.v3.CalendarList.Get"
        }
      }
    ]
  }
}
- access token 이 필요하다는 말
- google api access token oauth
- https://developers.google.com/identity/protocols/oauth2/web-server#callinganapi 

- curl https://opentutorials.org 를 터미널에 치면, 웹사이트의 웹페이지를 다운받는 기능을 가진 어플리케이션이다. 
- curl -H  이하 생략은 좀 더 안전하게 서버와 통신할 수 있다. 


WEB2 - OAuth 2.0 : 8. refresh token
- access token 은 수명이 있다. 
- 참조 웹사이트:
1) https://datatracker.ietf.org/doc/html/rfc6749#section-1.5
2) https://developers.google.com/identity/protocols/oauth2/web-server#offline


WEB2 - OAuth 2.0 : 9.수업을 마치며
- 원리를 알고보면, 라이브러리가 얼마나 우리의 수고를 덜어주는지 공감할 수 있을겁니다. 
<공부할 주제>
1. 
2. Oauth  의 사용이유는 API를 제어하기 위해서 , Restful 스타일로 설계되고 있다. API를 통해 주고 받는 데이터는 JSON,  XML과 같은 정보 형태, 데이터 포맷을 이용하는 경우가 많이 있다. 이런 키워드에 해당하는 지식을 접해보는것도 API를 잘 다루는데 매우 중요한배경지식이 될것이다. 
- Oauth 에 익숙해졌다면 좀 더 사회적인 애플리케이션을 만들 수 있는 중요한 진전을 이룬것

