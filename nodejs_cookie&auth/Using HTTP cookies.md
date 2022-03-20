# Using HTTP cookies

    - HTTP 쿠키(웹 쿠키, 브라우저 쿠키)는 서버가 사용자의 웹브라우저에 보내는 작은 데이터 조각입니다.
    - 브라우저는 쿠키를 웹브라우저에 저장하고, 같은 서버에 나중에 요청을 보낼때 쿠키를 다시 보냅니다.
    - 전형적으로, HTTP 쿠키는 두개의 요청들이 같은 브라우저로부터 왔는지 알려주기위해 사용되어 지며,
    사용자가 계속 로그인되어있도록 유지합니다. 예를 들어, HTTP cookie는 무상태인 HTTP 프로토콜에 대하여 
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
      함께 보내어지고, 그래서 성능을 악화할 수도 있습니다.(특히나 모바일 데이터 연결에 대하여)
    - 클라이언트 사이드 저장공간을 위해 최신 API들은 웹 스토리지 API이고(localStorage와 sessionStorage)와 
      IndexedDB 입니다.
 


Cookies were once used for general client-side storage. While this made sense when they were the only way to store data on the client,
modern storage APIs are now recommended. Cookies are sent with every request, so they can worsen performance
(especially for mobile data connections). Modern APIs for client storage are the Web Storage API (localStorage and sessionStorage) 
and IndexedDB.
