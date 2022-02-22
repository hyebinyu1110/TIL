
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
       depencies 영역에 
      - 이때까지 다운 받은 모듈의 버전과 이름을 저장해준다.
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








## 1. What is mySQL and why do I need it?(mySQL은 뭐고, 왜 내가 그게 필요한가?)
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
      
      
      
      
      

## 2. var mysql = require('mysql');
     var db = mysql.createConnection({
     host: 'localhost',
     user: 'root',
     password: 'hby6362488',
     database: 'dotconnector',
    }); 
    db.connect();
    module.exports = db;
