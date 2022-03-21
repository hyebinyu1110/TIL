# Using HTTP cookies

- 참조: [[MDN Web Docs References] HTTP Using HTTP cookies - Using HTTP cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies)
----

## Using HTTP cookies(HTTP 쿠키를 사용하기)
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
            
       
    

## Creating cookies(쿠키 생성하기)
 
    - HTTP 요청을 받은 후에, 서버는 한 개 또는 그 이상의 Set-Cookie 헤더를 응답과 함께 보낼수 있습니다. 브라우저는 보통 쿠키를
      저장하고 웹브라우저 상에 저장하고, Cookie HTTP 헤더 내부에 같은 서버로 만들어진 요청과 함께 쿠키를 포함하여 보냅니다.
    - 데이터 요청자는 만료날짜나 시한을 명세화할 수 있고, 그리고 나서 쿠키는 서버로 보내지지 말아야 합니다.
    - 데이터 요청자는 또한 특정한 도메인이나 경로로 어디로 쿠키가 보내어질지 제한하기위해 추가적인 제한 사항을 설정할 수 있습니다.
    - 아래에 언급된 헤더 속성에 대한 더 자세한 사항을 위해, 
   [Set-Cookie reference article](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie)을 참조해 주세요.
    
    
## The Set-Cookie and Cookie headers(Set-Cookie 와 Cookies 헤더들)
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



## Define the lifetime of a cookie(쿠키의 생존시간을 정의하기)

    - 쿠키의 생존시간은 2가지 방법으로 정의 될 수있습니다.
    - 세션 쿠키는 현재 세션이 끝나면 삭제됩니다. 브라우저는 언제 현재 세션이 끝날 지를 정의하고, 몇 브라우저들은
     웹브라우저가 다시 시작할때 세션 복원을 사용합니다.
    - 세션 복원 기능이 세션쿠키가 무한대로 남아있도록 야기할 수 있습니다.
    - 영구적인 쿠키들은 Expires 속성(절대적 기간)에 의해 명시된 날짜대로 삭제되거나, Max-Age 속성(상대적 기간)에 의해 
      명시된 기간 후에 삭제 됩니다.
    - 예를 들면:
    
~~~Java Script
Set-Cookie: id=a3fWa; Expires=Thu, 31 Oct 2021 07:28:00 GMT;
~~~
    - NOTE: 당신이 Expires 날짜와 시간을 설정할 때, Expires 날짜와 시간은 서버가 아니라, 쿠키가 설정되고 있는 클라이언트와 
    관련되어있습니다.
      (서버와 클라이언트의 위치에 따라 서로의 시간이 다를 수 있으니까)
    - 만약 당신의 사이트가 사용자를 인증한다면, 사이트는 세션 쿠키를 재생성하고, 다시 서버로 보내야 합니다. 이미 존재하는 
    세션 쿠키들을 보낼뿐 아니라,
      사용자가 인증할 때마다 세션쿠키를 다시 생성하고, 다시 보냅니다.
    - 이 접근법은 제 3자가 클라이언트 사용자의 세션을 재사용할 수 있는, 
   세션쿠키가 고정되어 발생할 수 있는 공격[session fixation attacks](https://developer.mozilla.org/en-US/docs/Web/Security/Types_of_attacks#session_fixation)을 예방합니다.


## Restrict access to cookies(쿠키에 대한 접근을 제한하기)
    - 당신은 쿠키들이 안전하게 보내어지고, 쿠키를 접근하도록 의도되지않은 자와 스크립트에 의해 접근되지 않도록 두 가지 방법 중 하나로
    확실히 할 수 있습니다.
     : Secure 속성과 HttpOnly 속성을 이용하여
    - Secure 속성을 가진 쿠키는 오직 HTTPS 프로토콜을 통해 암호화된 요청을 가지고 서버로 보내어집니다.
    - 쿠키는 보안이 작동되지 않는 HTTP로 절대 전송되지 않습니다.(localhost를 제외하고). 
    - 이 말인 즉슨, 중간자 공격((통신하는 두 대상 사이에 개입하여 당사자들이 교환하는 정보를 바꿈으로써 들키지 않고 도청을 하거나 거짓 정보를
    생성하는 컴퓨터 보안 침입 수법))
[man-in-the-middle](https://developer.mozilla.org/en-US/docs/Glossary/MitM)은 쉽게 쿠키에 접근할 수 없다는 말입니다. 보안이 작동하지 않는
사이트들은(URL 에 http를 가진)           
      
      Secure속성을 가진 쿠키들을 설정할 수 없습니다.
    - 그러나, Secure 속성이 쿠키에 있는 민감한 정보에 대한 모든 접근을 차단한다고 추정하지 마십시오. 예를 들어, 클라이언트의 하드디스크에 
    접근을 가진 사람은 (또는 Httponly 속성이 설정되어 있지않으면, 자바스크립트에 접근 권한을 가진 사람이) 정보를 읽고 수정할 수 있습니다.
    -  HttpOnly 속성을 가진 쿠키는 
    
   JavaScript [Document.cookie](Document.cookie)(https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie) API 에서 접근할 수 없고,서버에만 오직 보내어 집니다.
  
    
   
    - 예를 들어, 서버사이드 세션에서 계속 지속되는 쿠키들은 자바스크립트에서 이용가능할 필요가 없고, HttpOnly 속성을 가져야만 합니다.
   - 이 예방조치가 [cross-site scripting(XSS)](https://developer.mozilla.org/en-US/docs/Web/Security/Types_of_attacks#cross-site_scripting_(xss))
    공격을 경감시킵니다. 예를 들면, 

~~~Java Script
Set-Cookie: id=a3fWa; Expires=Thu, 21 Oct 2021 07:28:00 GMT; Secure; HttpOnly
~~~


## Define where cookies are sent(어디에 쿠키가 보내질지 정의하기)
    - 도메인(Domain)과 경로(Path)속성은 무슨 URLs로 쿠키들이 보내져야 하는지 쿠키의 범위를 정의합니다.


### Domain attribute
    - Domain 속성은 어떤 호스트가 쿠키를 받을 수 있는지 명세화 합니다. 만약 Domain 속성이 명세화 되지 않았다면, 
    쿠키를 설정한 같은 호스트로 속성이 기본 설정됩니다. (subdomain을 제외한) 
    - 만약 Domain이 명세화 되어있다면, subdomain은 항상 포함됩니다(domain을 가진 subdomain에서 쿠키를 보낼수있다는 뜻)
    - 그러므로 Domain을 명세화하는 것은 Domain을 생략하는 것보다 덜 제한적이지만, 그러나 subdomains들이 사용자에 대한 정보를 
     공유할 필요가 있을때 도움이 됩니다.
    - 예를들어, 당신이 만약 Domain=mozilla.org 로 설정한다면, 쿠키들은 항상 developer.mozilla.org와 같은 하위 도메인에서 이용가능해집니다.


### Path attribute
    - Path 속성은 Cookie 헤더를 보내기 위해, 요청된 URL에 반드시 존재해야하는 URL Path(경로)를 나타내어야합니다.
    - %x2F("/") 문자는 다이렉터리 구분자로 간주되어 지고, (도메인 속성에 설정된 값을 가지고 그 뒤에 오는)하위 디렉터리들도 
      마찬가지로 일치합니다.(도메인 설정 값 + 디렉터리 구분자 뒤에 오는 하위 디렉터리도 쿠키 값을 보낼 수 있는 경로로 인식한다는 건가?) 
    ( The %x2F ("/") character is considered a directory separator, and subdirectories match as well.)
    - 예를들어, 당신이 만약 Path=/docs을 설정한다면, 이러한 요청 경로는 아래와 일치 해야 합니다.
~~~Java Script
/docs
/docs/
/docs/Web/
/docs/Web/HTTP
But these request paths don't:

/
/docsets
/fr/docs
~~~
### SameSite attribute

The SameSite attribute lets servers specify whether/when cookies are sent with cross-site requests (where Site is defined by the registrable domain and the scheme: http or https). This provides some protection against cross-site request forgery attacks (CSRF). It takes three possible values: Strict, Lax, and None.

With Strict, the cookie is only sent to the site where it originated. Lax is similar, except that cookies are sent when the user navigates to the cookie's origin site. For example, by following a link from an external site. None specifies that cookies are sent on both originating and cross-site requests, but only in secure contexts (i.e., if SameSite=None then the Secure attribute must also be set). If no SameSite attribute is set, the cookie is treated as Lax.

Here's an example:

Set-Cookie: mykey=myvalue; SameSite=Strict
Note: The standard related to SameSite recently changed (MDN documents the new behavior above). See the cookies Browser compatibility table for information about how the attribute is handled in specific browser versions:

SameSite=Lax is the new default if SameSite isn't specified. Previously, cookies were sent for all requests by default.
Cookies with SameSite=None must now also specify the Secure attribute (they require a secure context).
Cookies from the same domain are no longer considered to be from the same site if sent using a different scheme (http: or https:).
Cookie prefixes
Because of the design of the cookie mechanism, a server can't confirm that a cookie was set from a secure origin or even tell where a cookie was originally set.

A vulnerable application on a subdomain can set a cookie with the Domain attribute, which gives access to that cookie on all other subdomains. This mechanism can be abused in a session fixation attack. See session fixation for primary mitigation methods.

As a defense-in-depth measure, however, you can use cookie prefixes to assert specific facts about the cookie. Two prefixes are available:

__Host-
If a cookie name has this prefix, it's accepted in a Set-Cookie header only if it's also marked with the Secure attribute, was sent from a secure origin, does not include a Domain attribute, and has the Path attribute set to /. This way, these cookies can be seen as "domain-locked".

__Secure-
If a cookie name has this prefix, it's accepted in a Set-Cookie header only if it's marked with the Secure attribute and was sent from a secure origin. This is weaker than the __Host- prefix.

The browser will reject cookies with these prefixes that don't comply with their restrictions. Note that this ensures that subdomain-created cookies with prefixes are either confined to the subdomain or ignored completely. As the application server only checks for a specific cookie name when determining if the user is authenticated or a CSRF token is correct, this effectively acts as a defense measure against session fixation.

Note: On the application server, the web application must check for the full cookie name including the prefix. User agents do not strip the prefix from the cookie before sending it in a request's Cookie header.

For more information about cookie prefixes and the current state of browser support, see the Prefixes section of the Set-Cookie reference article.

JavaScript access using Document.cookie
You can create new cookies via JavaScript using the Document.cookie property. You can access existing cookies from JavaScript as well if the HttpOnly flag isn't set.

document.cookie = "yummy_cookie=choco";
document.cookie = "tasty_cookie=strawberry";
console.log(document.cookie);
// logs "yummy_cookie=choco; tasty_cookie=strawberry"
Copy to Clipboard
Cookies created via JavaScript can't include the HttpOnly flag.

Please note the security issues in the Security section below. Cookies available to JavaScript can be stolen through XSS.









