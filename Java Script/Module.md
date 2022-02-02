# 바닐라 자바스크립트 By 고승원

> 
> 
> Module

# Module

##  1. 용어정리
    + 웹 어플리케이션 크기가 커지면서 자바스크립트로 구현하는 함수를 기능별로 분리하고 필요한 곳에서 호출해서 사용할 수 있도록 
      물리적인 자바스크립트 파일을 분리해서 사용할 수 있는 방법이 요구됨
    + 모듈?
    + 분리된 각각의 자바스크립트 파일이고 각 파일은 특정한 목적을 가진 여러개의 함수로 구성된 라이브러리
    
##  2. 사용법
    + 모듈은 export, import 지시자를 사용해서 다른 모듈에서 불러와 사용할수 있도록 구성가능.
    
    + export - export 지시자를 변수나 함수 앞에 붙이면 다른 외부 모듈에서 해당 변수나 함수를 import해서 사용할 수 있다.
    
    + import - import 지시자를 사용해서 다른 외부 모듈을 가져와서 사용할 수 있다.
    
  ~~~Java Script

export function log(message){ // 외부에서 사용할 수 있도록 import키워드가 사용됨
  console.log(message);
 }
export function error(message){
  console.error(message);
}

~~~
##  3. 사용 예
    + 다음은 HTML의 script태그 안에서 log.js파일에 선언된 함수인 log를 사용하는 예제
    + log함수를 사용하기위해서는 script 시작 태그의 type속성을 "module" 로 지정해야 함
    + 그리고 사용하려는 외부 모듈 파일을 import 키워드를 사용해 가져온다. 
    + 이때 import하는 모듈 안에서 export키워드로 정의된 변수 혹은 함수 중에서 사용할
      변수 혹은 함수만 가져오고자 챕터 5.9에서 다룬 object Destructuring 문법을 
      사용해서 사용할 변수명, 함수명을 선언해준다. 
    
    
  ~~~Java Script

<script type = "module">
import {log} from "/scripts/log.js" ;// log.js 파일에서 export로 지정된 함수 log함수만 import함
log("log로 메시지 출력"); //log 함수 사용가능
</script>

~~~  
    + 자바스크립트 파일에서 사용할 때에도 역시 동일 ref.js 파일을 생성하고 다음 코드 작성
    
~~~Java Script
import {log} from "./log.js";
log("log로 메시지 출력");
~~~      

##  4. things to note additionally
    + 모듈 스크립트는 페이지의 모든 HTML 요소가 로드되고 나서 난 다음 실행
    + 스크립트는 HTML문서가 완전히 준비될 때까지 대기 상태에 있다가 HTML 문서가
      완전히 만들어진 이후에 실행됨

##  5. 주의할 점
    + 모듈을 만들어서 주의할 점은 모듈을 사용하는 HTML 또는 자바스크립트 파일이 물리적으로 같은 폴더 위치에
      있더라도 상대경로 혹은 절대경로로 지정해야 한다. 
    + 경로가 없는 모듈은 허용되지 않는다. 
    + 프론트 엔드 프레임 워크인 Vue.js, React, Angular와 Node.js 개발 시에 모듈이 굉장히 많이 사용되기 때문에
      모듈에 대해서 반드시 이해할 필요가 있다.
    
~~~Java Script

import {log} from "log.js"; // Error!
// "./log.js"와 같이 경로 정보를 지정해주어야 함.
~~~

    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    


    
