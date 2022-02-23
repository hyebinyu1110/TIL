
# Node.js MySQL
- 참조: [www.w3schools.com /Node.js MySQL Insert Into](https://www.w3schools.com/nodejs/nodejs_mysql_insert.asp)


## 1. Insert Into Table
    - MySQL 에서 테이블을 채우기 위해, INSERT INTO 문을 사용하면 된다.
    - 아래의 customer 테이블에서 행을 추가하는 것을 보여준다.
   
~~~Java Script
    var msql = require('mysql');
    var con = mysql.createConnection({
    host: "localhost",
    user: "hostname",
    password: "your password",
    database: "mydbname",
    });
    
    con.connect(function(err){
    if(err) throw err;
    console.log("Connected!");
    var sql = "INSERT INTO customers (name, address) VALUES ('Company Inc', 'Highway 37')";
    con query(sql, function(err, result){
    if(err) throw err;
    console.log("1 record inserted");
    });
    });
~~~

    - 위의 코드를 "demo_db_insert.js" 이름의 파일로 저장하고, 파일을 실행한다.
~~~Java Script
    C:\Users\Your Name>node demo_db_insert.js
~~~
    - 위의 코드는 아래와 같은 결과를 출력할 것이다
~~~Java Script
   Connected!
   1 record inserted
~~~

## 2. Insert Multiple Records
    - 하나 이상의 행을 추가하기 위해, 값을 포함하는 배열을 생성하여, sql문의 물음표 부분에 삽입한다. 
    - 결과적으로 물음표 부분이 값의 배열로 대체될 것이다. (배열의 수 만큼 테이블에 행이 추가 될 것임)
    
    - 예) 데이터로 customers 테이블 채우기
    
~~~Java Script

var mysql = require('mysql');

var con = mysql.createConnection({
host: "localhost",
user: "yourusername",
password: "yourpassword",
database: "mydb",
});

con.connect(function(err) {
if(err) thorw err;
console.log("Connected!");
var sql = "INSERT INTO customers (name, address) VALUES ?";
var values =  [
    ['John', 'Highway 71'],
    ['Peter', 'Lowstreet 4'],
    ['Amy', 'Apple st 652'],
    ['Hannah', 'Mountain 21'],
    ['Michael', 'Valley 345'],
    ['Sandy', 'Ocean blvd 2'],
    ['Betty', 'Green Grass 1'],
    ['Richard', 'Sky st 331'],
    ['Susan', 'One way 98'],
    ['Vicky', 'Yellow Garden 2'],
    ['Ben', 'Park Lane 38'],
    ['William', 'Central st 954'],
    ['Chuck', 'Main Road 989'],
    ['Viola', 'Sideway 1633']
  ];
  
  con.query(sql, [values], function(err, result){
  
  if(err) throw err;
  console.log("Number of records inserted: " + result.affectedRows); 
  
  - 파일을 저장하고 코드를 콘솔에서 실행하면 'C:\Users\Your Name>node demo_db_insert_multiple.js'
  - 아래와 같은 결과가 나온다. 
 ~~~Java Script
Connected!
Number of records inserted: 14
 ~~~







































