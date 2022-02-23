# Selecting from a table
- MySQL에 존재하는 테이블로부터 데이터를 선택하기위해, SELECT 문을 사용하시오. 


## 1. SELECT * FROM table
    - 아래의 예시는 customers 테이블에서 모든 행(all records)을 선택하여, 결과물 *객체*로 보여준다.. 
    
~~~Java Script

// SELECT * 은 모든 열을 반환한다.
var mysql = require('mysql');

var con = mysql.createConnection({
host:"localhost",
user:"yourusername",
password: "yourpassword",
database: "mydb",
});

con.connect(function(err){
if(err) throw err;
var sql = "SELECT * FROM customers";
con.query(sql, function(err, result, fields){
if (err) thros err;
console.log(result);
});
});
~~~

    
      -위의 코드를 저장하고 실행하면 아래의 결과가 나온다. 
~~~Java Script
[
  { id: 1, name: 'John', address: 'Highway 71'},
  { id: 2, name: 'Peter', address: 'Lowstreet 4'},
  { id: 3, name: 'Amy', address: 'Apple st 652'},
  { id: 4, name: 'Hannah', address: 'Mountain 21'},
  { id: 5, name: 'Michael', address: 'Valley 345'},
  { id: 6, name: 'Sandy', address: 'Ocean blvd 2'},
  { id: 7, name: 'Betty', address: 'Green Grass 1'},
  { id: 8, name: 'Richard', address: 'Sky st 331'},
  { id: 9, name: 'Susan', address: 'One way 98'},
  { id: 10, name: 'Vicky', address: 'Yellow Garden 2'},
  { id: 11, name: 'Ben', address: 'Park Lane 38'},
  { id: 12, name: 'William', address: 'Central st 954'},
  { id: 13, name: 'Chuck', address: 'Main Road 989'},
  { id: 14, name: 'Viola', address: 'Sideway 1633'}
]

~~~

## 2. SELECT 열 이름 FROM table
    - 테이블에서 오직 몇 열(columns)만 선택하려면 SELEC구문뒤에 원하는 열이름을 콤마(,)로 나열하여 표기하여야한다.
    - 아래의 예시는 customers 테이블에서 이름과 주소 열만 선택하여 보여주는 구문이다. 
    - WHERE 를 표기하지 않으면 테이블 내 해당하는 열의 내용을 가진 모든 행을 보여준다.
    
~~~Java Script
var sql = "SELECT name, address FROM customers";
con.query(sql, function(err, result, fields){
if (err) thros err;
console.log(result);
});
});
~~~  


## 3. 결과물 객체
    - 위의 예에서 볼수 있는 것과 같이, 결과물인 객체는, 각각의 행(record)을 표현하는 객체를 배열의 형태로 가지고 있는 객체이다.  
    - 따라서, 세번째 행의 주소 열의 값을 반환하기위해서, 3번째 배열 객체의 주소 속성을 참조하기만 하면 된다.
~~~Java Script
console.log(result[2].address);
//결과물
Apple st 652
~~~



## 4. Fields 객체
    - 콜백함수의 세번째 인자인 field는 배열인데, 결과물에 있는 각 필드(열의 카테고리 제목)에 대한 정보를 가지고 있다.
    - 세번째 인자인 fields를 콘솔로 출력하면 아래와 같은 결과가 나온다.
~~~Java Script
[
  {
    catalog: 'def',
    db: 'mydb',
    table: 'customers',
    orgTable: 'customers',
    name: 'name',
    orgName: 'name',
    charsetNr: 33,
    length: 765,
    type: 253,
    flags: 0,
    decimals: 0,
    default: undefined,
    zeroFill: false,
    protocol41: true
  },
  {
    catalog: 'def',
    db: 'mydb',
    table: 'customers',
    orgTable: 'customers',
    name: 'address',
    orgName: 'address',
    charsetNr: 33,
    length: 765,
    type: 253,
    flags: 0,
    decimals: 0,
    default: undefined,
    zeroFill: false,
    protocol41: true
  }
]

console.log(fields[1].name);
//결과물
address
~~~

    













































