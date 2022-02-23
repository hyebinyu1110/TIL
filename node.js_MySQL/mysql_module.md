
# 

# var mysql = require('mysql');
- 참조: [npm mysql 웹사이트](https://www.npmjs.com/package/mysql)
- 참조: [깃헙 mysqljs/mysql](https://github.com/mysqljs/mysql)


## 0. 준비(생활코딩의 데이터베이스 관련 동영상을 볼것! 이해하기 참 쉽게 설명 되어 있다)
- 참조: [생활코딩 실습준비](https://opentutorials.org/course/3347/21175)

      - node.js(웹서버)상에서 sql언어로 데이터베이스 어플리케이션(MySQL 서버)으로부터 원하는 정보를 가져오기위해 MySQL과 nodejs가
        연동되어야 한다.
      - 그러기 위해선  MySQL S/W가 먼저 컴퓨터에 설치되어야 한다.(MySQL 공홈에서 본인 운영체제에 따라 다운 받기) 
      - 그 다음 nodejs와 mysql을 연결하기 위해선 nodejs 모듈중에 mysql과 연동하도록 도와주는 module이 필요하다. 
      - 에디터 터미널에서 npm install mysql --save(npm install -S mysql)를 작성하여 mysql 모듈을 다운 받는다. 
      - 이렇게 다운 받으면 npm이 mysql 모듈이 의존하는 모든 다른 패키지 파일을 다운 받아 준다. --save 옵션은 package.json 파일의
       depencies 영역에 이때까지 다운 받은 모듈의 버전과 이름을 저장해준다.
      - nodejs 프로그램에서 sql을 시작하기 위해서 터미널에서 mysql을 다운 받은 경로를 복사하여 아래와 같이 작성한다.
      - C:\Bitnami\wampstack-7.3.13-0\mysql\bin\mysql -uroot -p 이말은 이 경로에있는 mysql 프로그램을 root의 이름을 가진 사용자가
       비밀번호를 적고 프로그램을 시작하겠다라는 뜻(물론 사전에 MySQL 프로그램을 깐 뒤 프롬트 창에서 아이디와 비번을 설정해놔야 한다.)
      - 비번 창에 비번을 작성하고 나서 Welcome to the MySQL monitor. 이런 문구가 뜨면 성공적으로 nodejs에서 MySQL 데이터베이스 생성, 
      - 읽기, 수정, 삭제가 가능하다는 말이다. 


## 0. 데이터베이스의 본질
- 참조: [생황코딩 데이터베이스의 본질](https://www.youtube.com/watch?v=2S6H6URQiY8)

      - 데이터베이스의 본질은 입력(input)과 출력으로 구성되어 있다.
      - 입력은 다시 create, update, delete로 구성되어 있다.
      - 출력은 다시 delete로 구성 되어 있다.
      => 이것을 우리는 CRUD 라고 부른다.

## 0. DATABASE1 - file vs database
- 참조: [생황코딩 DATABASE1 - 3.file vs database](https://www.youtube.com/watch?v=skKfHer90eM)
 
      - 파일시스템은 원하는 정보의 검색하는데 불편하다.
      - 스프레드시트같이 구조적으로 데이터를 관리하면 편한데
      - 데이터베이스프로그램은 컴퓨터 언어를 이용해서 데이터를 관리할 수 있다.
      - 자동화 할 수 있다.
      
      
## 0. What is mySQL and why do I need it?(mySQL은 뭐고, 왜 내가 그게 필요한가?)
   - 참조: [What is mySQL and why do I need it?](https://www.123-reg.co.uk/support/servers/what-is-mysql-and-why-do-i-need-it/)
       
    - Structured Query Language(구조화된 문의 언어) 이다.   
    - 이 글은 mySQL 데이터베이스 어플리케이션의 기능을 설명합니다.
    - MySQL 은 SQL 언어를 이용한 관계형데이터베이스 관리시스템(참조: []()) 이다. 어플리케이션은 데이터 저장관리, 전자상거래, 기록관리를 
      포함하여 다양한 용도로 사용된다. 
    - 가장 흔한 용도로 mySQL은 '웹 데이터베이스'용이다.  mysql은 단 한 개의 정보 기록부터 온라인스토어에서 이용가능한 전체 재고품을 저장
      하기까지 어떤것이든 저장하기위해 사용된다.
    - PHP나 PERL같은 스크립팅 언어와 연계하여, 웹사이트를 새로 만드는게 가능하고, 실시간으로 mysql 데이터베이스와 상호작용하여 분류되고,
      검색가능한 정보를 웹사이트 유저에게 빠르게 보여준다. 
      => 즉, 웹 상에서 데이터를 저장하고, 검색하고, 분류하는데 SQL언어를 기반으로한 mysql 어플리케이션을 사용하는 것이다.
      (예: 웹사이트에서 검색하고,정렬하고, 인덱싱하고, 페이징하는 것)
      
      
## 1. db.js 파일 생성하여 mysql 로그인 정보 기록하기

~~~JavaScript
var mysql = require('mysql'); // mysql 모듈을 불러와야 mysql 모듈의 기능을 사용할 수 있다. 
var db = mysql.createConnection({ // 객체내의 메서드인 createConnection으로 로그인 정보를 바탕으로한 mysql서버 객체를 생성하고 
반환한다. 
    host: 'localhost', // mysql의 로그인 정보를 기입해야 내가 저장한 데이터베이스 정보를 불러올수 있다.
    user: 'root',
    password: 'hby6362488',
    database: 'dotconnector',   
  });
  
  db.connect(); // mysql과 nodejs의 연동이 시작된다.
  module.exports = db; // 다른 js파일에서 db 로그인정보를 가지고 있는 db서버를 사용할 수 있도록 하기위한 exports 함수를 사용하였다. 
  ~~~

## 2. nodejs 모듈로 파일의 시스템에 접근한것을 sql언어로 접근하면서 코드가 변경됨. 

~~~Java Script

이전: fs.readdir('./data', function (error, filelist) // fs모듈의 readdir 메서드로 다이렉터리의 파일리스트를 읽기
이후: db.query(`SELECT * FROM topic`, function(error, topics) 
// db 객체의 query 메서드를 이용해 SQL언어로 topic 데이터베이스 내용 다 불러오기
- 첫번째 인자에는 query 구문, 두번째 인자에는 콜백함수가 와 첫번째 인자는 에러시 사용될 변수, 두번째 인자는 데이터베이스에서 
불러온 결과물(각 row정보)가 들어가 있다.
~~~

## 3. exports.home = function(request, response){ }
    - exports 는 home이라는 변수가(함수가 대입된) 현재 파일이 아닌 다른 외부의 파일에서도 쓰일 수 있도록 해준다.(author.js 파일에 존재) 
    -예) main.js 파일에서 author.home(request, response); 형태로 호출 가능. 
    - 다른 형태로는 module.exports = { home: function( , ); } 와 같이 사용 가능
    
## 4. SELECT * FROM topic LEFT JOIN author ON topic.author_id = author.id WHERE topic.id=?, [queryData.id], 콜백함수()
    - topic LEFT JOIN author ON은 ON 이하의 조건에 따라 topic을 왼쪽, author를 오른쪽으로 두면서 두 테이블을 한 테이블로 합친다.
    - 보안상의 이유로 웹으로부터 전달된 값이 WHERE topic.id의 값에 대입되지 않도록 한다.   
    
~~~Java Script
var query = db.query(`SELECT * FROM topic LEFT JOIN author ON topic.author_id = author.id WHERE topic.id=? `
                     , [queryData.id], function(error2, topic){
                   // 사용자가 입력한 값은 신용하면 안되기 때문에 id=?로 해놓고 두번째 인자에 id값을 넣음 
                      그래서 ?로 두번째 인자가 치환됨. 두번째인자가 공격의 여지가 있는 것을 알아서 세탁해줌.
                    if(error2){ // 에러발생시
                    throw error2; // 에러를 던져서 프로그램이 중단 되도록 함.
                    }
~~~

## 5. how to escape query values (질의문의 값을 빠져나오게 하는 방법) => 데이터베이스 보안과 관련
       - npm 웹사에 있는 영어문장을 번역하면서 한번 더 문장의 뜻을 생각하게 되었다. 
       - 보통은 sql 질의 구문은 'query=value' 이렇게 구성되어있다. 하지만 'query=?' 이렇게 표기함으로써 문법상 원래 질의문 뒤에 와야 하는 값을
         다른 곳에 위치하도록하는 방법을 escape query values를 의미하는 것 같다. 
       - 질의문의 값을 빠져나오것은 오직 NO_BACKSLASH_ESCAPES SQL mode 가 disabled(작동꺼져 있음)으로 되어있어야 작동한다.
        (MySQL 기본모드는 disabled이다.)
       - SQL Injection 공격을 피하기 위해서 , 항상 사용자가 제출한 데이터를 SQL 질의문에 사용하기 전에 빠져나오게 해야 한다.
         ( 질의문에 바로 대입하지 않고, 필터해서 대입할수 있도록)
       - 방법은 아래의 예와 같이 mysql.escape(),connection.escape() or pool.escape() methods 들을 사용한다. 
       - 또한 DB 로그인 정보를 적어놓은 곳에 multipleStatement: true 를 해놓으면 안된다. 
       
~~~ Java Script
ar userId = 'some user provided value';
var sql    = 'SELECT * FROM users WHERE id = ' + connection.escape(userId);
connection.query(sql, function (error, results, fields) {
  if (error) throw error;
  // ...
});


- 또한 아래와 같이 위의 방법 대신 '?'(물음표) 기호를 질의문 값으로 대신 사용하여 escape 할수 있다.
- 그 대신 두번째 인자에 [] 기호와 함께 '?'에 치환될 value를 써야 한다. 

connection.query('SELECT * FROM users WHERE id = ?', [userId], function (error, results, fields) {
  if (error) throw error;
  // ...
});

- 아래의 예시도 위와 같은 의미 이다. 
  //  var sql = `SELECT * FROM topic LEFT JOIN author ON topic.author_id = author.id WHERE topic.id=${db.escape(queryData.id)}`;
  // console.log(sql);
  // var query = db.query(sql, function(error2, topic){
  // db.js에 multipleStatement: true 와 여기에서 db.escape(queryData.id)보단 아래의 코드가 더 편하다. 
  // 내가 이유를 모르면 multipleStatement: true로 해놓지 말것


-질의문에서 몇개의 value가 '?' 로 대체되었다면 치환될 값이 올바른 순서로 [ ] 내부에 ',' 쉼표로 연결되어 두번째 인자에 나열되어야 한다. 
connection.query('UPDATE users SET foo = ?, bar = ?, baz = ? WHERE id = ?', 
                 ['a', 'b', 'c', userId], 
                 function (error, results, fields) {
                if (error) throw error;
                // ...
                 });
~~~

## 6. sanitize-html
    - 참조: [npm 웹사이트 sanitize-html 파트](https://www.npmjs.com/package/sanitize-html)
    - sanitize-html 모듈은 이해하기 쉬운 API를 가진 간단한 HTML 세정기(??) 이다.
- sanitize-html는 인내심이 많습니당. 풍부한 text editor들이나 CKEditor에 의한 만들어진 HTML 조각들을 청소하는데 적합합니다.
- sanitize-html은 당신이 허용하는 태그와 그 태그에 허용되는 속성을 명세화하도록합니다.

<사용방법>
 1) 브라우저 상 : 먼저 생각하세요. 당신은 왜 sanitize-html 모듈을 브라우저에서 사용하려는 겁니까? 기억하세요. 서버는 브라우저를 절대 신용해서는 안됩니다.
- 당신은 서버에 저장하기위해 다른 어디에서도 HTML를 깨끗하게 할수 없고 오직 서버에서만 HTML를 깨끗하게 할 수 있습니다.
- (Think first: why do you want to use it in the browser? Remember, servers must never trust browsers. 
    You can't sanitize HTML for saving on the server anywhere else but on the server.)
- 그러나 어쩌면 당신은 미리보기를 위해 브라우저에서 즉시 정화된 HTML을 보기를 원할지도 모릅니다. 
- 아니면 모든 페이지를 로드할때 정화작업하기를 브라우저에게 요청하세요. 당신이 원한다면 할수 있습니다!
- 패키지 install하는 방법; ' npm install sanitize-html or yarn add sanitize-html '

- 2.x로 시작하는 sanitize-html 버전에서의 주된 변화는 더이상 브라우저 사용을 위해 준비된 build를 포함하지 않는다는 겁니다.
- 개발자들은 다른 종속성에 하는것과 마찬가지로 webpack과 같은 그들의 프로젝트 빌드내부에 sanitize-html을 포함하도록 예측되어 집니다.
- 그리하여 sanitize-html은 더이상 HTML내부에서 직접적으로 연결되도록 준비되지 않는 반면에, 개발자들은 이제 더 쉽게 그들의 필요에 따라 sanitize-html을 처리할 수 있습니다.

- 다른 프로젝트 자바스크립트를 가진 브라우저에 일단 코드가 만들어지고, 연결되면, sanitize-html은 프론트엔드 코드 상에 있는 HTML 문자열을 깨끗하게 소독하도록 사용됩니다. 

- 브라우저 상에서 들어오는 입력값(query의 값은 모두 서버상 sanitize 되도록 미리 설정해둘 것!)

~~~Java Script
import sanitizeHtml from 'sanitize-html';

const html = "<strong>hello world</strong>";
console.log(sanitizeHtml(html));
console.log(sanitizeHtml("<img src=x onerror=alert('img') />"));
console.log(sanitizeHtml("console.log('hello world')"));
console.log(sanitizeHtml("<script>alert('hello world')</script>"));
~~~

 2) nodedjs 상(추천되는 방법): 콘솔에 모듈을 먼저 설치 할것 ' npm install sanitize-html '
- 그 다음 .js 파일에서 모듈을 import 하기

~~~Java Script
// In ES modules
import sanitizeHtml from 'sanitize-html';

// Or in CommonJS
const sanitizeHtml = require('sanitize-html');
Use it in your JavaScript app:

const dirty = 'some really tacky HTML';
const clean = sanitizeHtml(dirty);
// 위의 sanitizeHTML(dirty) 는 디폴트로 허용된 태그와 속성만 남겨둡니다. 디폴트 리스트에 적힌 태그와 속성은 잘 만들어져있지만
// 어쩌면 당신이 원하는 태그와 속성이 아닐지도 모르니 아래와 같이 당신이 원하는 태그들과 속성들을 명세화하세요.
const clean = sanitizeHtml(dirty, {
  allowedTags: [ 'b', 'i', 'em', 'strong', 'a' ],
  allowedAttributes: {
    'a': [ 'href' ]
  },
  allowedIframeHostnames: ['www.youtube.com']
});

~~~

     - 완성되었습니다!

 
