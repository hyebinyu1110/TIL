~~~
<!DOCTYPE html>
<html>
  <head>
  <meta charset="UTF-8">
  <title>covertCurrencyFormat</title>
</head>

<body>
  
  <script>
    /*
     * 이 함수는 금액과 금액에 대한 표기 포맷 양식을 받고, 해당 포맷에 맞는 문자열로 반환하는 함수입니다.
     * @param {소수점을 포함한 숫자형} amount
     * @param { 문자열 } format */

     function convertCurrencyFormatter(amount, format){

      let currencyUnit = ""; // 화폐의 단위 표기
      //포맷에 제일 첫 문자가 #이 아닐 경우, 원(W) 혹은 달러($) 같은 화폐 단위로 인식하고 해당 단위를 currencyUnit에 저장하기 위한 조건문
      if(format.substring(0,1) !=="#"){
        currencyUnit = format.substring(0,1); // 첫문자 가져오기
      }

      let groupingSeparator = ""; // 금액 3자리마다 구분자 기본 값은 콤마(,) 로 설정
      let maxFractionDigits = 0; // 소수점 이하 자릿수 기본 값은 0
      let decimalSeparator = ""; // 소수점 이하 구분자 기본 값은 점(.)로 설정

      //포맷에 있는 콤마(,)의 인덱스 번호가 점(.) 인덱스보다 작으면 #,###.##과 같이 3자리마다 콤마 구분자를 사용함을 알 수 있음.
      if(format.indexOf(".") == -1){
        // 점(.)이 없는 경우 소수점 이하는 없으며 3자리마다 콤마 구분자를 사용하는 것을 의미함.
        groupingSeparator =",";
      }else if(format.indexOf(",") == -1){

        // 콤마(,)가 없는 경우 소수점 이하는 없으며 3자리마다 점(.) 구분자를 사용하는 것을 의미함.
        groupingSeparator =".";
      }else if(format.indexOf(",") < format.indexOf(".")){

        // 소수점 이하 몇 번째 자리까지 표기해야하는 지를 알기위해 포맷의 전체 길이와 점(.) 인덱스 번호를 이용
        // #,###.##인 경우 format.length는 8, format.indexOf(".")는 5
        // 소수점 자릿 수는 8 - 5 - 1 = 2
        groupingSeparator = ",";
        decimalSeparator = ".";
        maxFractionDigits = format.length - format.indexOf(".") - 1;
      }else { // 3자리마다 점(.) 구분자를 사용하고 소수점 이하는 콤마(,)
      
      groupingSeparator = ".";
      decimalSeparator = ",";
      maxFractionDigits = format.length - format.indexOf(",") - 1;
      
      }

      // 다음은 음수인 경우 음수부호와 화폐단위가 있는 경우 화폐단위를 분리하는 코드를 작성

      let sign = "";
      let dec = 1;
      // 소수점 자리 1이면 10, 소수점 자리 2 이면 100, 소수점 자리가 3이면 1000
      for(let i = 0;  i < maxFractionDigits; i++){
        dec = dec * 10;
      }

      // 포맷에서 지정한 소수점자리를 기준으로 반올림 적용한 값을 구함
      let v = String(Math.round(parseFloat(amount) * dec) / dec);

      // amount 값이 음수이면 음수 부호 마이너스(-)을  변수 sign에 저장하고, 부호를 제외한 값을 변수 v 에 저장
      if(v.startsWith("-")){
        sign = "-";
        v = v.subString(1);
      }

      // 다음은 정수 부분과 소수 부분을 분리하는 코드를 작성


      // 포맷의 제일 마지막 자리 문자가 0이면, 소수점이 없는 금액 값도 해당 소수점 자릿수만큼 보이도록하기 위해서임

      if(maxFractionDigits > 0 && format.subString(format.length -1) =="0"){
        v = String(parseFloat(v).toFixed(maxFractionDigits));
      } // toFixed 함수를 이용해서 강제로 해당 소수점자릿수까지 표기

      // 파라미터로 전달된 금액(amount)이 소수점 이하 값을 포함하고 있는 경우
      let d = ""; // 소수점 이하 값을 저장하기 위한 변수
      if(maxFractionDigits > 0 && v.indexOf(".") > -1){

        d = v.substring(v.indexOf(".")); // amount가  5421339.12이면, 변수 d에는 .12가 저장
        d = d.replace(".", decimalSeparator); // 소수점 구분자인 점(.)을 포맷에서 지정한 소수점 구분자인 decimalSeparator로 변경
        v = v.subString(0, v.indexOf(".")) // amount가 5421339.12이면, 변수 v에는 5421338
      }

      // 다음은 정수 부분을 3자리마다  포맷에서 지정한 구분자로 변경하는 코드를 작성

      let r = /(\d+)(\d{3})/; // 정규식 (\d+) - 숫자 1자리 이상 , (\d{3}) - 숫자 3자리

      // 파라미터로 전달된 amount의 정수값을 정규식을 통해 숫자 1자리이상과 숫자 3자리 패턴이 발견되는 동안에 반복문 수행
      while(v.test(v)){
        // amount의 정수값이  5421338이면
        // 첫번째 while 문에서는 $1에는 5421, $2에는 338
        // v는 5421,338

        // 두번째 while 문에서는 $1에는 5, $2에는 421
        // v는 5,421,338
        v = v.replace(r, "$1" + groupingSeparator + "$2"); // $1=5421, $2 = 338 => 5421,338, $1= 5, $2 = 421 =>5,421,338
      }

     }

      

     
  </script>
</body>

</html>
~~~
