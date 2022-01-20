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
      <th data-sort-key=""></th>
      <th data-sort-key=""></th>
      <th data-sort-key=""></th>
      <th data-sort-key=""></th>
      <th data-sort-key=""></th>
    </tr>
  </thead>
  <tbody id="user_tb"></tbody>
</table>
<script src="user.data.js"></script>

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
      regexp.test(user.email) ||
      regexp.test(user.phone) ||
      regexp.test(user.address)
    );

    render("user_tb", currentData);

  }
}

let currentData = userList;

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

</html>
~~~