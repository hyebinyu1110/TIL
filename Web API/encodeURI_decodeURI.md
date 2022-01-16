# 1. encodeURI
>encodeURI()는 URI의 특정한 문자를 UTF-8로 인코딩하고 연속된 이스케이프 문자로 변환한다. 특히 영문자가 아닌 한글, 중국어, 일본어등을 서버로 전송하거나 
브라우저URL로 올바르게 작동하려면 encodeURI()를 사용해서 문자를 인코딩해야 한다.

~~~encode_decodeURI
 <script>
   console.log(encodeURI("http://domain.com?x=A")); // http://domain.com?x=A
   console.log(encodeURI("http://domain.com?x=가")); //http://domain.com?x=%EA%B0%80


   const encoded = encodeURI("http://domain.com?X=가"); //http://domain.com?x=%EA%B0%80
   console.log(decodeURI(encoded)); // http://domain.com?X=가

  </script>
  ~~~
  
  # 2. decodeURI
  >인코딩 된 문자를 디코딩 한다. // 위의 예시 참조
