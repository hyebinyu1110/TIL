## 1.  url.parse(urlString[, parseQueryString[, slashesDenoteHost]])   
    - urlString은 구문분석(parse)할 URL 문자열이다.
    - parseQueryString의 자리에 오는 값은 true 또는 false를 사용하는데, 만약 true를 쓰면, query 속성이 querystring 모듈의 
      parse메서드에 의해 반환된 객체에 항상 포함된다. 
    - url.parse() 메서드는 URL string을 가져와서, 구문분석을 하며, URL 객체를 반환한다.
    * 기억할 점: node.js 공홈 명세에 적히기로는 url.parse() method 사용이 권장되지 않는다고 한다. 개발자는 WHATWG URL API를 사용해야한다.
    - 왜냐면 url.parse() method 는 url을 구문분석할때 관대하고 비표준의 알고리즘을 사용하기에, 보안상 문제가 생길 수 있다. 
    - 예를 들면 호스트이름 spoofing이나 부정확한 사용자 이름과 비밀번호로 사용자 신원확인을 할 수 있다.

