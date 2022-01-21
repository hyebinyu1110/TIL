# 바닐라 자바스크립트 By 고승원

> * SNS 로그인
> 
> * 구글계정으로 로그인은 OAuth 2.0기반의 사용자 인증 기능을 제공해 우리가 개발하는 애플리케이션 내에서 구글의 사용자 인증 기능을 이용할 수 있게 해주는 서비스
-----
  ## 공부한 내용

##  1. OAuth 2.0 란?
    + 타사의 사이트에 대한 접근 권한을 얻고, 그 권한을 이용하여 개발할 수 있도록 도와주는 프레임워크이다.
  * [출처: 작성자 blog.naver.com/pjok1122/221583426424] [OAuth 2.0 란?](https://blog.naver.com/pjok1122/221583426424)
  * [출처: 작성자 hwannny.tistory.com/92][OAuth 개념정리](https://hwannny.tistory.com/92)


  * [401오류](https://wontree.tistory.com/entry/%EC%B9%B4%EC%B9%B4%EC%98%A4%ED%86%A1-API-%EC%97%B0%EB%8F%99%EC%8B%9C-401-Unauthorized-%EC%98%A4%EB%A5%98#:~:text=%EC%B9%B4%EC%B9%B4%EC%98%A4%ED%86%A1%20%EB%A1%9C%EA%B7%B8%EC%9D%B8%20%EA%B8%B0%EB%8A%A5%EC%97%90%EC%84%9C,%EC%A3%BC%EC%86%8C%20%EB%AF%B8%EB%93%B1%EB%A1%9D%EC%9D%B4%20%EC%9B%90%EC%9D%B8%EC%9D%B4%EC%97%88%EB%8B%A4.)

- 왜 401 오류: invalid_client
The OAuth client was not found 오류가 뜨는지? 
-http://127.0.0.1:5500/googlelogin.html / 127.0.0.1 와 localhost는 동일한 것이 아닌가? 자꾸 API로 계정이 연동이 안되서 오류가 

- URL에 localhost 쳐보기 집에서


-[www와 비-www URL 중에서 선택하기](https://developer.mozilla.org/ko/docs/Web/HTTP/Basics_of_HTTP/Choosing_between_www_and_non-www_URLs)


<br/>
<br/>


OAuth란, 타사의 사이트에 대한 접근 권한을 얻고, 그 권한을 이용하여 개발할 수 있도록 도와주는 프레임워크
[출처] [OAuth] OAuth 2.0 개념 정리|작성자 pjok1122

~~~Java Script
<!DOCTYPE html>
<html>
    <head>
        <title>Document</title>
        <meta name="google-signin-scope" content="profile email">
        <meta name="google-signin-client_id" content="YOUR_CLIENT_ID.apps.googleusercontent.com">
        <script src="https://apis.google.com/js/platform.js"></script>
    </head>
    <body>
        
        <div id="google-signin-btn"></div>
        <script>
            gapi.signin2.render("google-signin-btn", { onsuccess: onSignIn});
            // 구글 로그인버튼이 생성되고, 로그인 성공시 호출할 콜백함수를 지정합니다.

            function onSignIn(){}
        </script>
    </body>
</html>
~~~
