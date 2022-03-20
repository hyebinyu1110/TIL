# Using HTTP cookies

- 참조: [[MDN Web Docs References] HTTP Using HTTP cookies - Using HTTP cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies)
----

## Using HTTP cookies
    - HTTP 쿠키(웹 쿠키, 브라우저 쿠키)는 서버가 사용자의 웹브라우저에 보내는 작은 데이터 조각입니다.
    - 브라우저는 쿠키를 웹브라우저에 저장하고, 같은 서버에 나중에 요청을 보낼때 쿠키를 다시 보냅니다.
    - 전형적으로, HTTP 쿠키는 두개의 요청들이 같은 브라우저로부터 왔는지 알려주기위해 사용되어 지며,
    사용자가 계속 로그인되어있도록 유지합니다. 예를 들어, HTTP cookie는,
   무상태[stateless](https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview#http_is_stateless_but_not_sessionless)인 HTTP 프로토콜에 대하여 
    
    stateful 정보((컴퓨터 보안 장치가) 네트워크 연결 상태를 추적할 수 있는 (TCP 연결 등))를 기억합니다.
    
    - 쿠키들은 주로 세가지 이유로 사용되어집니다.
    1) 세션 관리
     - 로그인, 쇼핑 장바구니, 게임 점수, 아니면 서버가 기억해야할 다른 어떤 것들
     
    2) 개인화
     - 사용자 선호도, 주제, 다른 설정들
     
    3) 추적
     - 기록, 사용자 행동 분석
     
    - 쿠키들은 한 때 일반적인 클라이언트 사이드 저장 공간을 위해 사용되어졌었습니다. 쿠키가 클라이언트 쪽에 데이터를 저장할 
      유일한 방법이였기 때문에 이해가 되기도 하지만, 이젠 최신의 저장공간 API들이 권장되어 집니다. 쿠키들은 모든 요청과
      함께 보내어져서, 그래서 성능을 악화할 수도 있습니다.(특히나 모바일 데이터 연결에 대하여)
    - 클라이언트 사이드 저장공간을 위해 최신 API들은,
   [웹 스토리지 API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API)이고(localStorage와 sessionStorage)와 
   [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) 입니다.
      
    - NOTE: 저장되어진 쿠키들을( 그리고 웹페이지가 사용할 수 있는 다른 스토리지들을) 보기 위해서, 
            웹브라우저 사용자는 개발자 도구에 있는 스토리지 inspector 기능을 활성화할 
            스토리지 트리로부터 쿠키들을 선택할 수 있습니다.
            
       
    

## Creating cookies
 
    - HTTP 요청을 받은 후에, 서버는 한 개 또는 그 이상의 Set-Cookie 헤더를 응답과 함께 보낼수 있습니다. 브라우저는 보통 쿠키를
      저장하고 웹브라우저 상에 저장하고, Cookie HTTP 헤더 내부에 같은 서버로 만들어진 요청과 함께 쿠키를 포함하여 보냅니다.
    - 데이터 요청자는 만료날짜나 시한을 명세화할 수 있고, 그리고 나서 쿠키는 서버로 보내지지 말아야 합니다.
    - 데이터 요청자는 또한 특정한 도메인이나 경로로 어디로 쿠키가 보내어질지 제한하기위해 추가적인 제한 사항을 설정할 수 있습니다.
    - 아래에 언급된 헤더 속성에 대한 더 자세한 사항을 위해, 
   [Set-Cookie reference artice](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie)을 참조해 주세요.
    
    
## The Set-Cookie and Cookie headers
    - Set-Cookie HTTP 응답 헤더는 서버로부터 사용자 agent에게 쿠키를 보냅니다. 간단한 쿠키는 이렇게 설정됩니다:
    
~~~Java Script
Set-Cookie: <cookie-name>=<cookie-value>
~~~
    - 이 설정은 클라이언트에게 쿠키들의 쌍(쿠키 이름-쿠키 값)을 저장할 것을 말하도록 서버에게 헤더를 보낼것을 지침합니다.

~~~Java Script
HTTP/2.0 200 OK
Content-Type: text/html
Set-Cookie: yummy_cookie=choco
Set-Cookie: tasty_cookie=strawberry

[page content]
~~~
    - 그러고나면, 서버에 대한 모든 뒤따르는 요청과 함께 브라우저는 이전에 저장된 모든 쿠키들을 Cookie 헤더를 사용하여 서버에 보냅니다.

~~~Java Script
GET /sample_page.html HTTP/2.0
Host: www.example.org
Cookie: yummy_cookie=choco; tasty_cookie=strawberry
~~~ 

    - Note: Set-Cookie 헤더를 다양한 서버사이드 어플리케이션에서 사용하는 방법이 여기에 있습니다 :  
- [PHP](https://www.php.net/manual/en/function.setcookie.php)
- [Node.JS](https://nodejs.org/dist/latest-v14.x/docs/api/http.html#http_response_setheader_name_value)
- [Python](https://docs.python.org/3/library/http.cookies.html)
- [Ruby on Rails](https://api.rubyonrails.org/classes/ActionDispatch/Cookies.html)
