
# 그림으로 배우는 Http & Network Basic By 우에노 센

> 
> 오늘 책으로 읽다 더 공부하고 싶어 찾아 본 내용
> 
-----

##  1. x-frame-option이란?
    + <iframe> 과 같은 태그 에서 외부참조가 되어 로딩 되지 않도록
    
##  2. 존재 이유
    1) iframe을 이용한 DDOS공격을 막기 위해 (많은 참조가 될 시 트래픽이 집중됨)  
    2) 클릭재킹(click jacking) 공격을 막기 위해
       - 클릭 재킹 : 인터넷 사용자를 유인하기 위한 숨은 하이퍼링크
       - 내가 웹사에서 선택한 기능이 숨어있는 하이퍼링크를 클릭하는 꼴이 됨.

##  3. 외부 참조 막는 방법
    + 리스폰스 헤더에서 X-frame-option 설정을 아래의 2가지로 한다.
    1) DENY - 아예 참조를 막음
    2) SAMEORIGIN - 같은 도메인 상에서만 참조를 가능하게 함. 예를 들어 구글에선 구글 내에서만 참조가 가능하도록


내용 참조: [X-Frame-Options이란? (에러 - it set 'X-Frame-Options' to 'sameorigin')](https://meaownworld.tistory.com/171)

