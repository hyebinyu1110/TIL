# Delete Record
- DELETE FROM 문을 통해 존재하는 테이블에 있는 행을 삭제 할 수 있다.


## 1. DELETE FROM table 
    - 아래의 예시는 "Mountain 21"을 가지고 있는 행을 삭제하는 문이다.
~~~Java Script
con.connect(function(err) {
  if (err) throw err;
  var sql = "DELETE FROM customers WHERE address = 'Mountain 21'";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Number of records deleted: " + result.affectedRows);
  });
~~~

    * NOTICE: WHERE 절이 DELETE구문에 있는 것을 주목하세요. WHERE구문은 어떤 행 혹은 행들이 삭제되어야 하는지 명세화 합니다.
    - 만약 WHERE절을 생략하면 테이블에 있는 모든 행이 삭제 될것입니다.
    - 위의 코드를 저장하고 실행하면 결과물은 'Number of records deleted: 1' 입니다.
    
 
## 2. result object( 결과물 객체)
    - query를 실행할 때, 결과물 객체가 반환됩니다.
    - 결과물 객체는 query가 어떻게 테이블에 영향을 미쳤는지에 대한 정보를 포함하고 있습니다.
    - 위의 예제에서 반환된 result object는 아래와 같습니다. 
    - console.log(result.affectedRows) => 1
    
    
