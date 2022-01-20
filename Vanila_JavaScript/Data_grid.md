# 바닐라 자바스크립트 By 고승원

> * 라이브러리 직접 구현해보기 
> 
> * 데이터 그리드는 웹애플리케이션을 개발할 떄 가장 많이 사용하게 되는 기능 중 하나. 사용자 목록, 고객 목록, 제품 목록 등 HTML의 `<table>`태그로 행과 열로 보여주는 데이터가 이에 해당.
  일반적으로 Data Grid는 각 컬럼명을 클릭하면, 클릭한 컬럼으로 데이터가 정렬되며, 필터링 기능, 페이징 기능 등을 필수적으로 제공한다.


  ## 주목할 함수

##  1. data-sort-key="name" 속성
    +  이 data-sort-key 라는 것은 저자가 만든 HTML 태그 임의의 속성인가? 구글에 찾아봐도 안나온다.
<br/>
<br/>
##  2-1. 배열 or 배열변수.sort() 함수
    + sort() 메서드는 배열의 요소를 적절한 위치에 정렬한 후 그 배열을 반환한다. 기본 정렬 순서는 문자열의 유니코드 포인트를 따른다.
    + 즉, 아래의 결과가 나올 수 있다는 것이다.
~~~Java Script
예제1)
const array1 = [1, 30, 4, 21, 100000];
array1.sort();
console.log(array1);
// expected output: Array [1, 100000, 21, 30, 4]
예제2)
const months = ['March', 'Jan', 'Feb', 'Dec'];
months.sort();
console.log(months);
// expected output: Array ["Dec", "Feb", "Jan", "March"]
~~~
<br/>
##  2-2. 배열 or 배열변수.sort(비교함수)
      + 매개변수인 비교함수는 선택사항이다.
      + 비교함수는 정렬 순서를 정의하는 함수이며, 생략하면 각 배열요소의 각 문자 유니코드 포인트 값에 따라 정렬된다.
<br/>
##  2-3. 반환값?
      + 원래 배열을 정렬한 배열을 반환한다. 복사본이 만들어 지는 것 아님 
      + 비교함수는 정렬 순서를 정의하는 함수이며, 생략하면 각 배열요소의 각 문자 유니코드 포인트 값에 따라 정렬된다.    
<br/>      
##  2-4. 비교함수 설명
      + 비교함수가 제공되지 않는 경우,
      + 배열 요소를 '문자열'로 변환하고 유니 코드 포인트 순서로
        (UTF-8은 ASCII코드를 포함하기 때문에, 아스키 코드 번호와 똑같다) 문자열을 비교하여 정렬된다.
      + 예를 들어, "바나나"는 "체리"앞에 온다. 또한 숫자 정렬에서는 9가 80보다 앞에 오지만 숫자는 문자열로 변환되기때문에, 
        80은 유니 코드순서에서 9 앞에 온다.
      + 비교함수가 제공되는 경우,
      + 배열 요소는 비교함수의 반환값에 따라 정렬이 된다.  a와 b 가 비교되는 두 요소라면, 
      + 비교함수(a, b) 반환값 < 0 인 경우, a가 b 보다 먼저 오도록 순서를 바꾼다.
      + 비교함수(a, b) 반환값 === 0 인 경우, a 와 b 그대로 유지
      + 비교함수(a, b) 반환값 > 0 인 경우, b가 a 보다 먼저 오도록 순서를 바꾼다.
      + 아래는 비교함수의 형식이다. 
<br/>
~~~Java Script
function compare(a, b) {
  if (a is less than b by some ordering criterion) { // 정렬 기준에 따라 a가 b보다 작다면
    return -1; // -1 을 반환
  }
  if (a is greater than b by the ordering criterion) { // 정렬 기준에 따라 a가 b보다 크다면
    return 1; // 1 을 반환
  }
  // a must be equal to b // 위에 해당하지 않는 다면,  a가 b와 같으므로
  return 0; // 0을 반환한다.
}
~~~
     
     + 문자열 대신 숫자를 비교하기 위해 compare 함수는 a에서 b를 뺄 수 있다. 다음 함수는 배열을
      오름차순으로 정리한다.
     + 다음 함수는 배열을 오름차순으로 정렬한다. (Infinity와 NaN이 포함되어 있지 않은 경우)
     
~~~Java Script
function compareNumbers(a, b) {
  return a - b;
}
~~~   
    + sort함수는 함수식(및 클로저)와 함께 사용 가능하다.
 ~~~Java Script
var numbers = [4, 2, 5, 1, 3];
numbers.sort(function(a, b) { // (a,b) => { 함수 내용 } 도 가능
  return a - b;
});
console.log(numbers);

// [1, 2, 3, 4, 5]
~~~     
    + 또한 배열에 객체인 키의 값을 기준으로 정렬할 수도 있다.
~~~Java Script
    var items = [
  { name: 'Edward', value: 21 },
  { name: 'Sharpe', value: 37 },
  { name: 'And', value: 45 },
  { name: 'The', value: -12 },
  { name: 'Magnetic', value: 13 },
  { name: 'Zeros', value: 37 }
];

// value 기준으로 정렬

// 예제1) 오름차순
items.sort(function (a, b) {  // (a,b) => { 함수 내용 } 도 가능
  if (a.value > b.value) {
    return 1;
  }
  if (a.value < b.value) {
    return -1;
  }
  // a must be equal to b
  return 0;
});

// 예제2) 내림차순
items.sort(function (a, b) {
  if (a.value > b.value) {
    return -1;
  }
  if (a.value < b.value) {
    return 1;
  }
  // a must be equal to b
  return 0;
});
~~~     
<br/>
<br/>      
##  3. new RegExp(문자열 || 문자열을 담은 변수, "i");
    + RegExp 생성자 함수는 첫번째 매개변수로 받은 문자열과 두번째 플래그를 조합하여 정규표현식을 반환한다.
    + 생성자 함수를 사용할 경우, 보통의 문자열 이스케이프 규칙(특수문자를 문자열에 사용할 때 앞에 역빗금(\)을 붙이는 것)을 준수한다.
    
~~~Java Script
let re = /\w+/i  // console.log(re) =>  /\w+/i
let re = new RegExp('\\w+', 'i') =>  /\w+/i           <- 역빗금을 붙임.
// 둘을 콘솔로 출력하면 동일한 정규표현식을 보여준다.
~~~ 
<br/>
<br/>
##  4. filter(()=> {}) 함수
    + filter() 함수는 함수 내부에 주어진 함수의 조건을 통과하는 모든 요소를 모아 새로운 배열로 반환한다.
    + 어떤 요소도 조건을 통과하지 않으면 빈 배열을 반환
  
~~~Java Script
const words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];

const result = words.filter(word => word.length > 6);

console.log(result);
// expected output: Array ["exuberant", "destruction", "present"]
~~~
  
##  5. document.querySelectorAll("th[data-sort-key]").forEach((th) =>
 <br/> 
 <br/>
##  6. sort(th.getAttribute("data-sort-key"));
 <br/>
 <br/>

~~~Java Script
<!DOCTYPE html>
<html>
  <head>
  <meta charset="UTF-8">
  <title>Document</title>
  <style>
    table{
      width: 100%;
    }  
    table,
    th,
    td{
      border-collapse: collapse;
    }
    th,
    td{
      border: 1px solid #222;
      padding: 5px 10px;
    }
    th{
      cursor: pointer;
      background-color: lightcyan;
      font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    }
    .pagination{
      display: inline-block;
      margin-top: 5px;
    }
    .pagination a{
      color: black;
      float: left;
      padding: 8px 16px;
      text-decoration: none;
      cursor: pointer;
    }
    .pagination a.active{
      background-color: deeppink;
      color: white;
    }
  </style>
</head>

<body>
  <input type="text" id="txt" /> <button onclick="filter();">검색</button>
<table>
  <thead>
    <tr>
      <th data-sort-key="name">Name</th>
      <th data-sort-key="company">Company</th>
      <th data-sort-key="email">E-mail</th>
      <th data-sort-key="phone">Phone</th>
      <th data-sort-key="address">Address</th>
    </tr>
  </thead>
  <tbody id="user_tb"></tbody>
</table>
<script src="user_data.js"></script>
  <script>
/*
 * tbody에  tr, td 태그를 주어진 데이터 수만큼 화면에 출력하는 함수
 * @param {String} id
 * @param {Array} data
 */
 function render(id, data){
   const h = []; // tr, td 태그에 대한 html 문자열을 담을 배열
   for(const user of data){
     h.push("<tr>");
     h.push(`<td>${user.name}</td>`);
     h.push(`<td>${user.company}</td>`);
     h.push(`<td>${user.email}</td>`);
     h.push(`<td>${user.phone}</td>`);
     h.push(`<td>${user.address}</td>`);
     h.push("</tr>");
   }
   document.getElementById(id).innerHTML = h.join("");
   //배열 h에 담긴 html 문자열을 하나로 합쳐서 innerHTML에 할당
  }
let lastSortKey = "";
let bAsc = true;
/*
 * 컬럼명(th)을 클릭하면, th의 속성 data-sort-key를 가져와 해당 키로 배열 데이터를 정렬하는 함수
 * @param {String} columnKey
 * @param {Boolean} bAsc - true면 오름차순, false면 내림차순
*/

function sort(columnKey){
  if(columnKey == lastSortKey) bAsc = !bAsc; // 마지막으로 정렬한 key 와 현재 key가 같으면 정렬 방식 변경
  let sortValue = bAsc ? 1 : -1;
  const sortData = currentData.sort(function(a,b){
    // 배열의 내장함수인 sort를 사용해서 배열 정렬
     return a[columnKey] > b[columnKey]
     ? sortValue
     : a[columnKey] < b[columnKey]
     ? sortValue * -1
     : 0;
  });
  render("user_tb", sortData);
  lastSortKey = columnKey;
}
/**
 * 사용자가 입력한 검색(필터)조건에 맞는 데이터를 출력
*/

function filter(){
  const txt = document.getElementById("txt").value; // 검색 입력창에 입력한 문자열
  if(txt === ""){
    //필터 조건이 없으면 전체 데이터 출력
    currentData = userList;
    render("user_tb", currentData);
  }else {
    const regexp = new RegExp(txt, "i"); // 대소문자 구분없이 조회하기위해 입력된 텍스트를 소문자로 변경
    currentData = userList.filter(
      (user) =>
      regexp.test(user.name) ||
      regexp.test(user.company) ||
      regexp.test(user.email) ||
      regexp.test(user.phone) ||
      regexp.test(user.address)
    );
    render("user_tb", currentData);
  }
}
let currentData = userList; // 여기에서 변수 userList는 user_data.js 파일에서 import된 배열 변수
window.addEventListener("load", function(){
  document.querySelectorAll("th[data-sort-key]").forEach((th) =>
   { // 컬럼명(th)를 클릭하면 정렬함수 실행
  th.addEventListener("click", function(){
    sort(th.getAttribute("data-sort-key"));
  });
  });
  render("user_tb", currentData); // render 함수를 호출해서 화면에 데이터를 테이블로 출력
});
  </script>
</body>
~~~


* [캐리지리턴 참조 블로그](https://kwangcheolchae.wordpress.com/2012/12/04/%EC%BA%90%EB%A6%AC%EC%A7%80-%EB%A6%AC%ED%84%B4%EC%9D%B4%EB%9E%80/#:~:text=%EC%BA%90%EB%A6%AC%EC%A7%80%20%EB%A6%AC%ED%84%B4(Carriage%20Return)%20%EC%9D%80,%EB%A1%9C%20%EC%9D%B4%EB%8F%99%EC%8B%9C%ED%82%A8%EB%8B%A4%EB%8A%94%20%EB%9C%BB%EC%9E%85%EB%8B%88%EB%8B%A4.&text=%EC%9C%88%EB%8F%84%EC%9A%B0%EC%97%90%EC%84%9C%EB%8A%94%20%EC%9D%B4%20%EB%91%90%20%EB%8F%99%EC%9E%91,Enter%20%EB%8F%99%EC%9E%91%EC%9D%84%20%ED%95%98%EB%8A%94%EA%B2%83%EC%9E%85%EB%8B%88%EB%8B%A4..)
* [sort()함수 참조 블로그](https://mber.tistory.com/51)
* [[,thisArg]참조 블로그](https://ktpark1651.tistory.com/215)
* [MDN 공식 웹사이트 filter()함수 관련 정보](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
* 
