
# Update Table
- 테이블에 존재하는 행을 UPDATE 문을 이용하여 변경할 수 있다.


## 1. UPDATE table SET '변경조건'
    - 아래의 예시는 valley345 에서 Canyon 123으로 addres열의 값을 덮어쓰는 걸 보여준다.
    
~~~Java Script
var mysql = require('mysql');

var con = mysql.createConnection({
host:"localhost",
user:"yourusername",
password: "yourpassword",
database: "mydb",
});

con.connect(function(err){
if(err) throw err;
var sql = "UPDATE customers SET address= 'Canyon 123" WHERE address="valley 123";
con.query(sql, function(err, result){
if (err) thros err;
console.log(result.affectedRows + "record(s) updated");
});
});
~~~

    * NOTICE:  WHERE 절이 UPDATE 구문에 포함된 것을 기억하라. WHERE 절은 어떤 행 또는 행들이 변경되어야 하는지 명세화한다.
      만약 WHERE 절을 생략하면 모든 행들이 변경될 것이다!!!!!!!!!!!!!!!!!!!!
      -위의 코드를 저장하고 실행하면 아래의 결과가 나온다. 
      - '1 record(s) updated'
