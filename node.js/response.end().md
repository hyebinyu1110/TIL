## 1. response.end([data[, encoding]][, callback])
    - 이 메서드는 모든 응답헤더와 바디가 보내어졌음을 서버에게 신호를 보내는 의미다.
    - response.end()메서드는  각각의 응답마다 마지막에 반드시 호출되어야 한다.
    - 만약 data와 encoding인자가 주어졌다면 data가 웹브라우저에 선택된 인코딩 방식으로 렌더링 되어 보여진다.
    - callback함수는 응답 스트림이 다 끝나고 수행되는 함수이다.
