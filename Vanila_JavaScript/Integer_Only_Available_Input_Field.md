
# 바닐라 자바스크립트 By 고승원

> 라이브러리 직접 구현해보기 
> 
> 정수형 숫자만 입력가능한 input 필드만들기


  ## 주목할 함수

##  1. ASCII코드에서 문자로 변환하는 법 | String.fromCharCode(변환할 ASCII 코드 번호)
    + console.log(String.fromCharCode(180)
     // 출력 "¾"
    
    
##  2. 함수 이벤트 연결하는 2가지 방법
    - 첫번째 케이스) onkeydown="checkInt(event) 
    - 두번째 케이스) document.getElementById(eleId).addEventListener("keydown", checkInt); 
    // 두번째 케이스 경우에는 스크립트에 함수를 한번 선언해줘야 함수가 실행되면서 
    // 태그와 이벤트가 연결되고 keydown 이벤트 발생시 함수가 실행된다.
    
    
##  3. event.keyCode
    - 자바스크립트는 사용자의 키입력을 감지하여 함수 처리 가능
    - event.KeyCode는 ASCII코드에 기반함 예) 여기서 e는 호출한 함수에 전달된 이벤트, 
    // 키보드가 눌러질때마다(keydown이벤트) 키보드에 눌린 글자의 아스키코드가 컴퓨터에 전달됨
 

~~~Java Script
<body>
    int 만 받기:<input type="text" onkeydown="checkInt(event);" onkeyup="checkKr(event);" />
    <br/>
    <br/>
    float도 받기: <input type="text" onkeydown="checkFloat(event);" onkeyup="checkFloatKr(event)"; />
    <br/>
    <br/>
    int 만 받기: <input type="text" id="num1">
    <br/>
    <br/>
    float도 받기: <input type="text" id="num2">
  <script>
      
      //checkInt()함수에서는 사용자가 입력하는 키가 무엇인지 확인하고 숫자, 백스페이스, delete, 왼쪽, 오른쪽, 
      방향키가 아니면 입력이 안되도록 하는 함수를 구현한다.
    /**
     * 사용자가 입력하는 키보드 이벤트를 감지하고, 0-9까지 숫자, 백스페이스, delete키, 좌우 방향키만 입력받도록 하는 함수
     * @param {event} e
     * @returns
     */
    function checkInt(e){
        if(
            !(
                (e.keyCode >= 48 && e.keyCode <=57) ||
                e.keyCode === 8 ||
                e.keyCode === 46 ||
                e.keyCode === 37 ||
                e.keyCode === 39             
            )
        ){
            e.preventDefault(); // 이벤트가 keyup 까지 진행이되어야 input필드에 값이 입력이 되는데, 
          여기서 이벤트를 중단시켜서 값이 입력되지 않도록 중단시킴.
        }
    }
    /**
     * 사용자가 입력하는 키보드 이벤트를 감지하고, 한글이 입력되면 한글을 삭제하는 함수
     *@param {event} e
     *@returns
     */
    
     function checkKr(e){
         e.target.value = e.target.value.replace(/[^0-9]/gi, "");
     }
     // 소수점을 포함한 input 필드만들기
     // 소수점을 포함한 숫자를 입력할 수 있는 input필드를 만들때 는 위의 checkInt()함수에 소수점에 해당하는 
     // keyCode(190) ="."만 추가적으로 허용하면 됨.

     /*
      * 사용자가 입력하는 키보드 이벤트를 감지하고, 0-9까지 숫자, 소수점(.), 백스페이스, delete키,좌우방향키만 입력 받도록 하는 함수
      * @param{event} e
      * @returns */
      function checkFloat(e){
          if(
              !(
                  (e.keyCode >=48 && e.keyCode <=57) ||
                  e.keyCode === 190 ||
                  e.keyCode === 8 ||
                  e.keyCode === 46 ||
                  e.keyCode ===37 ||
                  e.keyCode === 39
              )
          ){
              e.preventDefault(); // 이벤트가 keyup까지 진행이 되어야 input필드에 값이 입력이되는데, 
                                 //  여기에서 이벤트를 중단시켜서 값이 입력되지 않도록 중단시킴.
          }
      }
      /*
       * 사용자가 입력하는 키보드 이벤트를 감지하고, 한글이 입력되면 한글을 삭제하는 함수
       * @param {event} e
       * @returns*/
      
       function checkFloatKr(e){
           e.target.value = e.target.value.replace(/[^0-9]\./gi, "");  
         // 여기서 '.'를 특수문자로서, 단일문자를 의미하는 것이 아닌 일반문자 '.'(점)으로 의미하기위해 앞에 백슬래시(/)를 붙여줌 
       }
    /*
     * 
     * @param {String} eleId - input 요소의 아이디
     * @param {String} type - int이면 정수형 숫자, float이면 소수점포함한 숫자를 입력할 수 있는 필드
    */
    function setField(eleId, type){
        if(type === "int"){
            document.getElementById(eleId).addEventListener("keydown", checkInt);
            document.getElementById(eleId).addEventListener("keyup", checkKr);
        }else if(type === "float"){
            document.getElementById(eleId).addEventListener("keydown", checkFloat);
            document.getElementById(eleId).addEventListener("keyup", checkFloatKr);
        }
    }
    setField("num1", "int");
    setField("num2", "float"); 
  </script>
</body>
~~~Java Script
