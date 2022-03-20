# nodejs + cookie&auth(nodejs + 쿠키 및 인증)


- 참조: [생활코딩 nodejs cookie&auth 강의](https://www.youtube.com/watch?v=i51xW3eh-T4&list=PLuHgQVnccGMDo8561VLWTZox8Zs3K7K_m)

     
      - 쿠키: 웹브라우저와 웹서버가 주고 받는 정보, HTTP 프로토콜에 포함되어 있는 기술
      - 웹브라우저는 리로드를 할때마다 set cookie로 인해 구워진 저장된 쿠키값을 쿠키라고 하는 헤더값을 통해 서버로 전송하고 있는 것이다. 그리고 
      - 모든 정보시스템의 핵심은 CRUD 생성, 읽기, 수정, 삭제 이다. 
      -  지금 읽는 법은 아직 안봤고, 생성하는 법을 보았다. 
      - 다음은 어떻게 서버쪽으로 웹브라우저가 전송한 쿠키를 볼수 있는가이다.
      - how to get cookie in nodejs on google
      - 웹 브라우저상에서 웹사이트의 언어설정을 한국어로 바꾼뒤 개발자도구에 가서 애플리케이션-쿠키에서 보면 언어에 대한 쿠키 값이 저장되어있는 데 
        이것이 리로드 없이도 바뀐 이유: 자바스크립트라고하는 컴 언어를 통해서도 리로드 없이 쿠키값을 바꿀 수 있기 때문
      - 브라우저가 달라도 A브라우저에서의 특정 웹사이트에 대한 로그인 쿠키를 B 브라우저에서 웹사이트의 쿠키에 session id를 추가하면, 로그인이 됨. 
        session id 쿠키 번호는 로그인에 성공했을때 서버에서 발행하는 번호임
      - 아이디, 비밀번호, 이멜은 없지만, 저 값이 있으면 로그인이 됨. 저 값이 훔쳐진다면, 나 대신 로그인(보안이슈)이 됨. 
      - 쿠키는 굉장히 중요한 정보이다. 
      - Max-Age는 상대적 기간, 
      - expires 는 절대적 기간
      - Secure and HTTPonly cookie
      - Secure는 https 인 경우만 데이터 전송함
      - HttpOnly 는 자바스크립트로 접속할때는 HttpOnly flag 값이 설정되어있는 값은 자바스크립트 눈에는 보이지 않는다. 자스를 이용해 쿠키를 훔쳐서,
        나쁜 짓을 하는 경우가 너무 많기 때문에 이런 옵션을 통해 sessionid와 같이 털리면 큰일 나는 정보를 자바스크립트로 접근하지 못하도록 하는 옵션을
        설정하게 하는게 HttpOnly 이다. 
      - 경우에 따라 특정디렉터리에서만 쿠키가 활성화 되도록 하고 싶을 수도 있다.  그럴때 사용하는 것이 path 라는 기능이다. 
      - path라고 하는 옵션을 줘서 특정 디렉터리나 그 디렉터리 아래에서만 path가 활성화되서, 웹브라우저 거기에 해당되는 쿠키만을   서버에게 제 공
      - Domain 은 IP의 이름
      - o2.org:4000 실행이 안됨. 
      - Referrer Policy: strict-origin-when-cross-origin
      - this attempt to set a cookie via a Set-Cookie header was blocked because its domain attribute was invalid with regards to the current host url.
      - path 는 어디 path에 동작할 것인가
      - domain은 어떤 도메인에서 동작할 것인가를 제안 o2.org는 .o2.org 로서 . 앞의 서브 도메인에도 동작함.
      - 실제로 여기에 있는 코드를 쓰면 안된다. 
      - submit을 하면 login_process 가 받는다. login_procss가 저 정보를 받아서 로그인을 시킴. 실제 비밀 번호가 일치 하는지 확인한 다음에, 일치하면 쿠키로 일치 
        했다고 하는 정보를 굽는 것을 통해, 로그인을 완성할 것이다. 
      
      - 도전과제: 쿠키에 은밀한 정보를 가지면 안됨. 
      - session 인증방식
      - 쿠키 이용하여 개인화 기능을 한번 구현해보기: 사용자 언어설정, 방문횟수를 카운팅 하는 작업을 쿠키로 처리 할 수 있다. 
      - http://bit.ly/web2-cookie -> 쿠키를 이용해서 개인화된 애플리케이션을 구현화한 사례를 담고 있는 조금한 애플리케이션. 
      - 주간 야간에 따라 시각적으로 보이는 것을 바꿀수 있다. 사용자의 선택의 결과를 쿠키에 저장해서 다음 방문에 같은 화면을 볼수 있도록 처리함.
      - localstorage / index 는 쿠키의 새로운 대안
      - 쿠키는 4kb 이상 저장 가능 X, localstorage 와 indexed DB는 가능
      - 샘플 애플리케이션은 사용자 비번 암호화 하지 않고 저장되기에 보안에 위험됨 (코드가 유출될 시) => 보호수단 (해쉬), 해쉬 통과하면 비번 뭔지 알수 없음 
      - (hash, salt, key stretching 이거 어려우니 대신 해주는 라이브러리들 , PBKDF2, bcrypt 라이브러리가 대표적 사례)
      - 쿠키를 통해 엄청난 가능성을 가지니 음미해볼것!



