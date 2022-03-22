# Using HTTP cookies

- 참조: [[MDN Web Docs References] HTTP Using HTTP cookies - Using HTTP cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies)
- 참조: [Attribute와 Property 의 차이점](https://medium.com/hexlant/attribute-%EC%99%80-property-%EC%9D%98-%EC%B0%A8%EC%9D%B4-c6f1c91ba91)
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
            당신은 Developer Tools에 있는 Storage inspector 기능을 활성화하고,
            스토리지 트리로부터 쿠키들을 선택할 수 있습니다.
            
       
    

## Creating cookies(쿠키 생성하기)
 
    - HTTP 요청을 받은 후에, 서버는 한 개 또는 그 이상의 Set-Cookie 헤더를 응답과 함께 보낼수 있습니다. 브라우저는 보통 쿠키를
      저장하고, Cookie HTTP 헤더 내부에 같은 서버로 만들어진 요청과 함께 쿠키를 포함하여 보냅니다.
    - 당신은 만료날짜나 시한을 명세화할 수 있고, 그리고 나서 쿠키는 서버로 보내지지 말아야 합니다.
    - 당신은 또한 어디로 쿠키가 보내어질지 제한하기위해  특정한 도메인이나 경로에 추가적인 제한 사항을 설정할 수 있습니다.
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
### SameSite attribute(SameSite 속성)

   - [SameSite](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite) 속성은 
   
    - 서버로 하여금 쿠키가 cross-site(사이트 간) 요청과 함께 보내질지의 여부/ 언제 쿠키가 cross-site 요청과 보내질지 명세하게 합니다.
   (여기서, [Site](https://developer.mozilla.org/en-US/docs/Glossary/Site)는 등록가능한 도메인과 스킴( http 또는 https) 에 의해 정의됩니다.)
    - SameSite 속성은  cross-site 요청 위조 공격[CSRF](https://developer.mozilla.org/en-US/docs/Glossary/CSRF)에 대하여 몇가지 보호를 제공합니다. 
    - SameSite 속성은 3가지 가능한 값을 가집니다. (Strict, Lax, None)
    - Strict으로, 쿠키는 오직 쿠키가 생성된 사이트로만 보내어집니다.
    - 쿠키의 최초 사이트로 사용자가 넘어갈때 보내어진다는거 외에는 Lax도 Strict와 비슷하다.
    (예를들어, 외부 웹사이트로부터 링크로 쿠키가 생성된 사이트로 넘어갈때)
    - None 은 쿠키가 처음 생성된 웹사이트와 cross-site(사이트 간) 요청 둘 다에서 보내어지는 것을 명세화하며, 오직 secure 문맥에서만 보내어집니다.
    (예를 들어, SameSite=None이 설정되면 Secure 속성 또한 함께 설정되어야 한다.) 
    - 만약 SameSite 속성이 설정되어있지 않다면, 쿠키는 Lax로 취급됩니다. 
    - 여기에 예가 있습니다.
    :
~~~Java Script
Set-Cookie: mykey=myvalue; SameSite=Strict
~~~
---
    - Note: SameSite 에 대한 표준이 최근에 변경되었습니다.(MDN 은 새로운 실행에 대해 위에 기록합니다.)
    (어떻게 속성이 특정 브라우저 버전에서 처리되는지에 관한 정보를 위해 쿠키 브라우저 호환성 테이블을 참조해주세요.)
    -  SameSite=Lax는 SameSite가 명세화되어 있지 않다면 설정되는 기본설정입니다. 이전에는 쿠키가 기본설정으로 모든 요청에 대하여 
    보내졌었습니다.
    - SameSite=None 를 가진 쿠키는 현재 Secure 속성을 반드시 명세화하여야 합니다.(secure context를 필요로 하기때문에)
    - 같은 도메인으로부터의 쿠키들은 만약 다른 스킴(http: or https:)을 사용하여 보내어진다면 같은 사이트로부터 보내어진것으로 취급되지 
    않습니다.
---


### Cookie prefixes

    - 쿠키가 작동하는 메커니즘의 디자인 때문에, 서버는 쿠키가 안전한 출처으로부터 설정되었는지 확인할 수 없고, 또한 
    쿠키가 원래 어디서 처음 설정되었는지 말할 수 없습니다.
    - subdomain에 있는 취약한 어플리케이션은 Domain 속성으로 쿠키를 설정할 수 있습니다. Domain 속성으로 쿠키를 설정하는 것으로
     모든 다른 하위 도메인에 대하여 쿠키의 접근을 허가합니다.?? 뭔말이니...
     (A vulnerable application on a subdomain can set a cookie with the Domain attribute, which gives access to that cookie on all other subdomains.)
    - 이 메커니즘은 세션 고정 공격에서 남용 될 수 있습니다.  
   - 주요한 경감 메서드를 보기위해 [session fixation](https://developer.mozilla.org/en-US/docs/Web/Security/Types_of_attacks#session_fixation)를 참조해주세요.
    
    - 그러나, 깊이 있는 방어 방법으로, 당신은 쿠키 접두사를 사용하여 쿠키에 대한 특정사실을 단언하는데 사용할 수 있습니다. 
    - 2 개의 접두사가 이용가능합니다.

    __Host-
    - 만약 쿠키 이름이 Host 접두사를 가지고 있고, 안전한 origin에서 보내어진(Domain 속성을 포함하지 않는) secure 속성과 함께 표기되어 있다면, 
    Set-Cookie 헤더에서 받아들여 집니다. (또한 '/'(루트)로 설정된 Path 속성을 가지고 있습니다.) 이 방식으로, 쿠키들은 "domain-locked"로 보여 질수 있습니다.
   
    __Secure-
    - 만약 쿠키 이름이 Secure 접두사를 가지고 있고, 안전한 origin으로 부터 보내어진 Secure 속성을 가진것으로 표기되어있다면 Set-Cookie 헤더에서 받아들여 집니다.
     이것은 __Host 접두사보다 약한 기능 가지고 있습니다.

    - 브라우저는 접두사가 가진 제약을 따르지 않는 접두사를 가진 쿠키들을 받아들이지 않을 것입니다. 이 방식은 접두사와 함께 하위도메인에서 생성된 쿠키들이 
    하위도메인에 국한되거나 완전히 무시당하는 것을 보장한다는 것을 기억하세요. 
    - 어플리케이션 서버는 사용자가 인증되었거나 CSRF 토큰이 올바른지 결정하기 위해 오직 특정 쿠키 이름만을 확인하기 떄문에, 이 방식은 세션 고정에 반하여
    방어 조치로서 효과적으로 행동합니다.

---
Note: 어플리케이션 서버상에서, 웹 어플리케이션은 반드시 prefix를 포함하는 cookie 전체이름을 체크해야 합니다.  User Agents들은 요청의 쿠키 헤더에 있는
접두사를 보내기전에 쿠키로부터 접두사를 떼어내 버리지 않습니다.
Note: On the application server, the web application must check for the full cookie name including the prefix. User agents do not strip the prefix from the cookie before sending it in a request's Cookie header.
---

    - 쿠키 접두사와 브라우저 지원에 대한 현재 상태에 대해 더 많은 정보를 위해,
    [Prefixes section of the Set-Cookie reference article](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie#cookie_prefixes)
    를 봐주세요.
    
    
### JavaScript access using Document.cookie
    - 당신은 Document.cookie 속성을 사용하여 자바스크립트를 통해 새로운 쿠키들을 생성할 수 있습니다. 당신은
    - 만약 HttpOnly 플래그가 설정되어있지 않다면 당신은 또한 현존하는 쿠키를 자바스크립트로 접근할 수 있습니다.
    
   - [Attribute와 Property의 차이점](https://medium.com/hexlant/attribute-%EC%99%80-property-%EC%9D%98-%EC%B0%A8%EC%9D%B4-c6f1c91ba91)

    
~~~Java Script
document.cookie = "yummy_cookie=choco";
document.cookie = "tasty_cookie=strawberry";
console.log(document.cookie);
// logs "yummy_cookie=choco; tasty_cookie=strawberry"
~~~

    - 자바스크립트를 통해 생성된 쿠키들은 HttpOnly 플래그를 포함할 수 없습니다.
    - 아래의 Security 섹션에서 보안 이슈들을 확인하여 주세요. 자바스크립트에 이용가능한 쿠키들은 XSS를 통하여 훔쳐질 수 있습니다.
    
  
### Security
---
Note:  당신이 쿠키들에 정보를 저장할 때, 모든 쿠키 값이 최종 사용자에의해 변경되거나, 최종사용자에게 보인다는 것을 기억하십시오.
애플리케이션에 따라, 당신은 서버가 찾아보는(검색하는) 또는 JSON 웹 토큰과 같은 대안적인 인증이나/비밀(기밀) 메커니즘을 조사하는 이해하기 힘든 식별자를 사용하고 싶을 지도 모릅니다.
When you store information in cookies, keep in mind that all cookie values are visible to, and can be changed by, the end user. Depending on the application, you may want to use an opaque identifier that the server looks up, or investigate alternative authentication/confidentiality mechanisms such as JSON Web Tokens.
---

#### Ways to mitigate attacks involving cookies:

    - HttpOnly 속성을 사용하여 자바스크립트를 통한 쿠키 값으로의 접근을 예방하십시오.
    - 민감한 정보(인증을 나타내는)에 사용되는 쿠키는 짧은 생명주기를 가져야 하며, SameSite속성은 Strict나 Lax로 설정되어 있어야 합니다.
    (위에 있는 SameSite 속성을 보아주세요). [
   - [SameSite을 지원하는 브라우저에서는](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie#browser_compatibility) 사이트간(cross-site) 요청과 함께 인증 
   
    
    - 쿠키가 보내지지 않는 다는 것을 보장합니다. 이 행위가 요청이 효과적으로 어플리케이션 서버에 인증되지 않도록 합니다.


### Tracking and privacy
#### Third-party cookies

    - 쿠키는 특정 도메인과 스킴(http or https와 같은)과 연관되어 있습니다.또한 만약 Set-Cookie 도메인 속성이 설정되어있다면, 하위도메인과 연관되어 있을수 있습니다.
    - 만약 쿠키 도메인과 스킴이 현재 페이지에서 일치 한다면, 쿠키는 페이지로서 같은 사이트에서 온 것을 간주 됩니다. 그리고 직접적으로 연관된 쿠키로서 참조됩니다.
    
    - 만약 도메인과 스킴이 다르다면, 쿠키는 같은 페이지로부터 온것이 아니라 다른 사람 쿠키로서 간주됩니다. 서버가 웹페이지를 호스팅하는것이 first-party 쿠키를 설정하는 반면에 
    페이지는 third-party  쿠키들을 설정할지도 모르는 다른 도메인(광고 배너와 같은) 안에있는 서버에 저장된 다른 구성요소나 이미지를 포함할지 모릅니다. 
    - 이것들은 주로 광고나 웹을 가로지로 트래킹을 하는데 사용됩니다. 예를 들어 구글에 의해 사용되는 종류의 쿠키들 말입니다.
    
    - A third-party 서버는 다양한 사이트를 접근할 때 같은 브라우저에 의해 보내어진 쿠키들에 기반하여 사용자의 브라우징 히스토리와 습관의 프로필을 생성할 수 있습니다.
    - 파이어폭스는 기본설정으로 trackers 를 포함하는 것으로 알려진 third-party 쿠키를 차단합니다. third-party 쿠키들(또는 단순한 tracking 쿠키들)은
    또한 다른 브라우저 설정이나, 확장에 의해 차단될지도 모릅니다. 쿠키 차단은 몇 third-party 구성요소(소셜 메디아 위젯과 같은) 의도된 대로 기능하지 못하도록 막습니다.
     
---
Note: 서버들은(그리고 해야합니다.) third party 사이트들에 쿠키들을 보낼지 말지의 여부를 명세화하는 SameSite  속성 쿠키를 설정할 수 있습니다.
---


### Cookie-related regulations
    - 쿠키들의 사용을 다루는 규정이나 입법은 아래를 포함합니다.

~~~ Java Script
The General Data Privacy Regulation (GDPR) in the European Union
The ePrivacy Directive in the EU
The California Consumer Privacy Act
~~~ 
    - 이 규정들은 전 세계적으로 범위를 미칩니다. 규정들은 이러한 관할구역으로 부터의 사용자가 접근하는  World Wide Web의 어떤 사이트든지 적용됩니다.
    (EU and California에 적용되며, 캘리포니아의 법은 다른 것 중에 오직 총 수익이 2,500만 달러 이상을 가진 법인에만 적용되는 경고가 있습니다.)
    - 이 규정은 다음과 같은 요구사항을 포함합니다.

~~~Java Script
Notifying users that your site uses cookies.(당신의 사이트가 쿠키를 사용한다는 것을 사용자에게 알리는 것)
Allowing users to opt out of receiving some or all cookies.(사용자로 하여금 모든 쿠키는 몇 쿠키로부터 연관되지 않는 것을 허용하는 것)
Allowing users to use the bulk of your service without receiving cookies.(사용자로 하여금 쿠키를 받는 것 없이 당신의 서비스의 대부분을 사용하도록 하는 것)
~~~ 
    - 당신의 현지에서 쿠키의 사용을 관장하는 다른 규정이 있을지도 모릅니다. 부담/책임은 당신이 알고, 이러한 규정을 따르는 것입니다.
    - 어떤 회사들은 당신이 이런 규정을 따르도록 도와주는 cookie banner 코드를 제공합니다.


### Other ways to store information in the browser(브라우저에 정보를 저장하는 다른 방법들)
   
    - 브라우저에 데이터를 저장하는 다른 접근 Web Storage API 입니다. window.sessionStorage and window.localStorage 속성은 지속중인 세션과 영구 쿠키에 상응합니다.
    - 그러나 쿠키보다 더 큰 저장소 제한을 가지고 있습니다.그리고 서버에 절대로 보내어지지 않습니다. 더 구조화 되고 더 큰 양의 데이터들이 IndexedDB API나 데이터 위에
    세워진 라이브러리를 사용하여 저장될 수 있습니다.
    
    - 쿠키들이 삭제된후에 쿠키들을 재생성하도록 디자인된 몇몇 기술들이 있습니다. 이러한 쿠키를 '좀비' 라부릅니다. 이러한 기법은 사용자 사생활과 사용자 제어 원칙을 위반하고,
    데이터 사생활 규정을 위반하는 것입니다. 그래서 좀비쿠키를 사용하는 웹사이트에 법적인 책임을 부여할수 있습니다.

Another approach to storing data in the browser is the Web Storage API. The window.sessionStorage and window.localStorage properties correspond to session and permanent cookies in duration, but have larger storage limits than cookies, and are never sent to a server. More structured and larger amounts of data can be stored using the IndexedDB API, or a library built on it.

There are some techniques designed to recreate cookies after they're deleted. These are known as "zombie" cookies. These techniques violate the principles of user privacy and user control, may violate data privacy regulations, and could expose a website using them to legal liability.

또한 아래를 참조해 주세요.

Set-Cookie
Cookie
Document.cookie
Navigator.cookieEnabled
SameSite cookies
Inspecting cookies using the Storage Inspector
Cookie specification: RFC 6265
HTTP cookie on Wikipedia
Cookies, the GDPR, and the ePrivacy Directive
Found a problem with this page?
Edit on GitHub
Source on GitHub
Report a problem with this content on GitHub
Want to fix the problem yourself? See our Contribution guide.
Last modified: Jan 21, 2022, by MDN contributors









