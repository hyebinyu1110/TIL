# 바닐라 자바스크립트 By 고승원

> 
> 
> REST API

# UI -> API -> REST API 순서로 정리 (생활코딩 참조)


##  1. UI란? (User Interface) => 사용자가 대면하는 접점이 되는 지점 UI
    + 사람이 생각하는 바를 컴퓨터에 전달하는 입력장치들
    + 또한, 컴퓨터의 계산결과나 어떤 상태를 사람에게 알려주는 출력장치
    + 즉, 위의 입력장치와 출력장치에 해당되는 '접점', ' 그 중계치에 해당되는 것' 
    + 'UI' 라고 부른다.
    + 하드웨어적으로는 키보드, USB 케이블 포트, 키보드, 모니터
    + 소프트웨어적으로는 브라우저에서 뜨는 알람창, 검색 입력하는 곳, 브라우저 상 클릭하는 버튼 등등이다.   

##  2. API란? (Application Programming Interface)
    +  예를 들면 우리는 브라우저 URI 작성하는 곳에 javascript:alert("hello world")를 작성하고 엔터를 치면 alert창이 뜬다
    +  이것은 브라우저 회사(예 구글, 마이크로소프트, 모질라)의 개발자가 미리 시스템(web)에 javascript:alert("hello world")
       를 작성하면 alert 창을 띄우도록 프로그래밍해서 만들어 놓은것이다.
    + 경고창이 실은 복잡한 프로그래밍임에도 불구하고 우리는 단순히 alert만 치면 적은 노력으로 브라우저 위로 네모난한 경고창이 뜬다.
      - 경고창 위치도 브라우저 넓이에서 세로 가로로 가운데위치하여야 하고, 알람느낌표나, 클로징(X)도 OS 시스템에서 빌려와야함 
    + 이와 같이, 우리는 웹브라우저라고 하는 기반이 되는 시스템, 플랫폼이 우리에게 제공한 인터페이스, alert와 같은 것을 
      응용해서 s/w, 프로그램을 만든다는 점에서 API라는 말을 쓴다. 
    + 응용프로그램을(Application) 프로그래밍(Programming)할 때 쓰는 인터페이스(Interface)(접점)
    + 개발자는 UI를 사용하기도 하며, API를 이용해서 자신의 맥락에 맞게 응용해 web 플랫폼을 제어 한다. 
    + 웹 브라우저가 제공하고 있는 그러한 조작방법 이용코드를 다양한 방법으로 결합해서 우리 고유의 애플리케이션을 만들게 된다.
    + 한마디로 남이 만들어놓은 서비스를 내가 빌려와서 나만의 서비스를 만든다. 
    
##  3-1. REST API란? (Representational State Transfer API)
    + REST API는 특정기술을 의미하는 것이 아니다.
    + REST는 자원을 이름으로 구분하여 해당자원의 상태를 주고받는 모든 것을 의미
    + 여기서 상태는 전송되는 데이터라고 할 수있으며, 일반적으로 JSON형태로 데이터를 주고 받음
    + REST는 기본적으로 웹의 기존 기술과 HTTP프로토콜을 그대로 사용하기 때문에 웹의 장점을 최대한 활용할 수 있는 아키텍처
    + 네트워크 상에서 클라이언트와 서버 사이의 데이터를 통신하기위해 가장 많이 사용되는 통신 방식 중 하나.
    
##  3-2. REST API 사용방법
    + REST는 HTTP URI를 통해 자원(resource)을 명시하고, HTTP Method(POST, GET, PUT, DELETE)를 통해 해당 자원에 대한
      CRUD를 수행한다.
    + 여기서 CRUD란, CREATE(생성), READ(조회), UPDATE(수정), DELETE(삭제)를 말한다.
    + 웹에서는 일반적으로 서버에 구현해 놓은 REST API를 클라이언트가 호출해서 데이터 전송, 조회, 수정, 삭제 같은 기능을
      서버에 요청할 수 있게 한다.
    + HTTP + JSON 형태로 REST API를 정의하면 웹, 안드로이드, IOS같은 플랫폼에 구애받지 않으며,  자바, 파이썬 같은 언어에
     종속받지 않고, HTTP 와  JSON을 사용할 수 있는 모든 플랫폼에서 사용이 가능하다는 장점
    
    
+ 참조: 생활코딩 [UI와API](https://www.youtube.com/watch?v=Z4kH0IZVT-8&t=173s)
+ 참조: 생활코딩[REST API](https://www.youtube.com/watch?v=PmY3dWcCxXI)
+ 참조: 15호의 개발자 [React json-server --watch 실행 시 에러 해결](https://unit-15.tistory.com/entry/React-json-server-watch-%EC%8B%A4%ED%96%89-%EC%8B%9C-%EC%97%90%EB%9F%AC-%ED%95%B4%EA%B2%B0)
+ 참조: 새발개발자 [React - json-server 실행오류 net::ERR_CONNECTION_REFUSED](https://devbirdfeet.tistory.com/120)
+ 참조: [[네트워크] REST API란? REST, RESTful이란?](https://khj93.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-REST-API%EB%9E%80-REST-RESTful%EC%9D%B4%EB%9E%80)


##  3-3. json-server 라이브러리를 다운받아 json파일을 만들어 간단히 시뮬레이션 하는 법(JSON 서버를 활용해서 CRUD 테스트)
+ 참조: poiemaweb.com [14.3 JSON Server](https://poiemaweb.com/json-server#:~:text=json%2Dserver%EB%8A%94%20json%20%ED%8C%8C%EC%9D%BC,%ED%95%A0%20%EC%88%98%20%EC%9E%88%EB%8A%94%20%ED%88%B4%EC%9D%B4%EB%8B%A4.)
