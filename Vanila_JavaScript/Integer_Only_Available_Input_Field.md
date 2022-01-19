
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
    - (event.KeyCode는 ASCII코드에 기반함 예) 여기서 e는 호출한 함수에 전달된 이벤트, 
    // 키보드가 눌러질때마다(keydown이벤트) 키보드에 눌린 글자의 아스키코드가 컴퓨터에 전달됨
 
##  4. event.preventDefault();
    - 위의 함수는 어떤 이벤트가 조건에 합당하지 않을경우, 해당 이벤트가 발생할 시, 브라우저에서 실행이 되지 않도록 막는다.
    - 아래의 예시에서 보이듯이 체크박스의 기본동작은 체크박스를 클릭하거나 체크 해제하는 것인데 event.preventDefault();
      함수를 사용하여 DOM 요소의 기본동작을 막도록한다.
~~~Java Script
// 기본 클릭 동작 방지하기
<body>

    <p>체크박스를 클릭해주세요.</p>

    <form>
        <label for="id-checkbox">체크박스:</label>
        <input type="checkbox" id="id-checkbox" />
    </form>

    <div id="output-box"></div>

    <script>
        document.querySelector("#id-checkbox").addEventListener("click", function (event) {
            document.getElementById("output-box").innerHTML += "죄송합니다! 
            <code>preventDefault()</code> 때문에 체크할 수 없어요!<br>";
            event.preventDefault();
        }, false);
    </script>

</body>
~~~
    
    
##  5. event.stopPropagation();
    - event.stopPropagation()함수는 이벤트의 버블링으로부터 DOM요소가 영향을 받지않도록 하는 역할을 한다.
    - 예를 들어 테이블 자체에 클릭이벤트가 연결되어있고, 테이블 내 첫째 행에 클릭 이벤트가 발생할시, 
      테이블 자체의 버블링 현상으로 행도 클릭이벤트가 연결되어 클릭하면 클릭이벤트에 연결된 함수가 
      실행이 되어야 한다.
    - 그러나 HTML이 로딩될 시, 테이블의 행도 이벤트가 연결되는데, 이 이벤트가 연결된 함수가 e.stopPropagation();
     이라는 함수를 호출하면 테이블이 클릭이벤트와 연결되어있어도 이 행은 클릭이벤트와의 연결을 막아 준다. 
~~~Java Script
// 예시
<script>
function stopEvent(ev) {
  c2 = document.getElementById("c2");
  c2.innerHTML = "hello";

  // this ought to keep t-daddy from getting the click.
  ev.stopPropagation();
  alert("event propagation halted.");
}

function load() {
  elem = document.getElementById("tbl1");
  elem.addEventListener("click", stopEvent, false);
}
</script>
</head>

<body onload="load();">

<table id="t-daddy" onclick="alert('hi');">
  <tr id="tbl1">
    <td id="c1">one</td>
  </tr>
  <tr>
    <td id="c2">two</td>
  </tr>
</table>
~~~



~~~Java Script
// 전체 예시
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

      //정수형 숫자만 입력가능한 input 필드만들기
      //checkInt()함수에서는 사용자가 입력하는 키가 무엇인지 확인하고 숫자, 
      백스페이스, delete, 왼쪽, 오른쪽, 방향키가 아니면 입력이 안되도록 하는 함수를 구현한다.

    /**
     * 사용자가 입력하는 키보드 이벤트를 감지하고, 0-9까지 숫자, 백스페이스, delete키, 좌우 방향키만 입력받도록 하는 함수
     * @param {event} e
     * @returns
     */

    function checkInt(e){
        if(
            !(
                (e.keyCode >= 48 && e.keyCode <=57) || // 0~9 숫자
                e.keyCode === 8  || // 백스페이스
                e.keyCode === 46 || // delete
                e.keyCode === 37 || // 왼쪽방향키
                e.keyCode === 39     // 오른쪽 방향키         
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
         //백스페이스, delete키, 좌우 방향키는 입력되면 "" 로 대체됨!
     }


     // 소수점을 포함한 input 필드만들기
     // 소수점을 포함한 숫자를 입력할 수 있는 input필드를 만들때 는 위의 checkInt()함수에 소수점에 해당하는 
     keyCode(190) ="."만 추가적으로 허용하면 됨.

     /*
      * 사용자가 입력하는 키보드 이벤트를 감지하고, 0-9까지 숫자, 소수점(.), 백스페이스, delete키,좌우방향키만 
      입력 받도록 하는 함수
      * @param{event} e
      * @returns */

      function checkFloat(e){
          if(
              !(
                  (e.keyCode >=48 && e.keyCode <=57) ||
                  e.keyCode === 190 || //   keycode 값 190은 "." (점) 을 의미
                  e.keyCode === 8 ||
                  e.keyCode === 46 ||
                  e.keyCode ===37 ||
                  e.keyCode === 39
              )
          ){
              e.preventDefault(); // 이벤트가 keyup까지 진행이 되어야 input필드에 값이 입력이되는데, 
              여기에서 이벤트를 중단시켜서 값이 입력되지 않도록 중단시킴.
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
