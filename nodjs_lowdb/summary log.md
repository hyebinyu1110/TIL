# lowdb
- 참조: [lowdb on github](https://github.com/typicode/lowdb)
- 참조: [생활코딩 Database 2 - Lowdb](https://opentutorials.org/module/3675/22078)
## DATABASE2 lowdb - 1. 수업소개  
    - JSON(JavaScript Object Notation)
    - lowdb는 JSON의 형식으로 데이터를 저장하는 매우 간단한 데이터베이스이다. 자바스크립트는 객체, 배열, Boolean,문자열, 숫자를 표현하는
      매우 간결한 방법을 가지고있다. 이 방법 그대로, 텍스트에 저장을 해두면, 나중에 그 정보를 가지고 올때, 그것 그대로 자바스크립트의 
      데이터로 전환할 수있다. 이 방법에 주목한 더글라스 크로포드는 JSON을 XML의 강력한 경쟁자로 추대함. 
    - JSON의 편리함은 곧 많은 컴퓨터언어들에게 전파되었고, 오늘날 JSON은 서로 다른 컴퓨터 언어들간에 데이터를 교환할 때, 사용하는 가장 중요한
     데이터 포맷이 되었다. 거의 대부분의 언어가 객체, 배열,Boolean, 문자열, 숫자를 사용하기 때문에, JSON을 이용하면 복잡한 변환절차 없이 
     데이터를 그대로 주고 받을 수 있다.  
    - simple English 는 850개 영어단어만을 사용하는 것을 통해 전세계인들이 쉽게 소통 하도록하자는 아이디어 이다. 
    - JSON은 데이터 포맷분야의simple english 라고도 비유 할 수 있다. lowdb는 JSON 파일 포맷에 데이터를 CRUD(생성, 조회, 수정, 삭제)하는
     데이터베이스입니다. 
    - 또 한편, 관계형 데이터베이스가 SQL을 언어로 사용한다면, lowdb 는 자바스크립트를 언어로 사용한다. 따라서, 자바스크립트를 사용하고 있고, 
    본격적인 DB의 고성능 , 고기능성 대용량을 필요하지 않으면서도, 누구나 읽기 쉬운 JSON 파일의 형식으로 데이터를 관리하고 싶다면 lowdb는 
    좋은 선택. 
    - 지금부터 별도의 SW 설치 없이 많은 공부를 해야지 간신히 사용할 수 있는, 어떤 DB의 장엄함에서 벗어나서, 배울것이 별로 없는 
    lowdb를 통해 데이터의 관리자가 되어 볼 것입니다. 말하자면 컵라면 같은 데이터베이스라고 할 수 있다. 
    - 자 준비됐나요? 출발합시다.
    (난 참 따라 적으면서 시간을 잘 보내네 ㅋㅋㅋ 승무원 강의 들을때 많이 적어서 그런가 타이핑이 그래도 나름 빠르네)

## DATABASE2 lowdb - 2.1. 설치 : Nodejs
    - 깃허브는 lowdb가 만들어지고 있는 소스코드의 저장소라고 생각하면 됨. 자바스크립트를 통해 동작되는 환경은 웹브라우저에서 가능하고, 
    nodejs 에서도 가능하고, Electron (데스크탑 어플리케이션을 만드는 환경)에서도 가능하다. 


## DATABASE2 lowdb - 2.2. 설치 : 웹브라우저
    - lowdb를 웹브라우저에서 사용하면, localstorage 라고 하는 저장공간에 데이터베이스를 쉽게 사용할 수 있다. 
    - 그리고 아이러니 하지만 터미널에, python -m http.server 를 치면, python 에 내장되어있는 웹서버에 의해 현재 디렉터리가 웹서버의
     다큐먼트 루트가 된다.(아니면 visual studio의  live server 기능으로 chrome을 자동으로 열면 localhost:포트번호(자동으로 지정)
     로 document root 가 설정됨(ex) http://127.0.0.1:5500/web.html)

    - Serving HTTP on :: port 8000 (http://[::]:8000/) ... // 이렇게 터미널에 뜸
    - 각자 자신의 방법대로 웹서버를 켜면 된다. 
    - 그리고 브라우저 URI 자리에 http://localhost:8000/web.html 적기 하면, 아무것도 없는 화면이 나옴 

    - 개발자 도구 - application tab - localstorage-http://localhost:8000/web.html를 클릭하면, db 에 {} 가 생성되어 있음
    - 우리의 코드가 실행되면 우리는 lowdb를 통해서 localstorage에 db라는 이름의 key의 value 로 데이터를 앞으로 저장할 것이기에
     db(key 이름)에 {}(value) 가 생성된 것임.
    - 이제부터 웹브라우저와 nodejs가 똑같이 우리가 사용할 수 있기에 공통된 설명을 진행하겠다. 

## DATABASE2 lowdb - 3. 기본 데이터 설정

    - main.js 기준으로 이고잉은 하지만, web으로 하고 있다면 web.html에서 진행하면 된다.
    - 우리가 db를 처음 만들면 db.json이라고 하는 비어있는 파일이 만들어짐.  저 안에다가 정보들을 넣으려고 하면, 늘 정보를 어디에다가 
     넣을것 인가가 확보되어 있어야 함. 거기가 없으면, 자동으로 생성해주는 코드가 defaults이다
    - web.html 에  db.defaults({ topic: [], author: [] }).write(); 코드를 추가한 후, 서버를 활성화하여 web에서 리로드하고 localstorage를 
     확인하면 키 값에 { "topic": [], "author": [] }이 들어가 있는 것을 확인할 수 있음. 

## DATABASE2 lowdb - 4. 생성

    - 정보기술의 본질은 데이터고, 그 데이터와 관련해서 우리가 해야할 일 중에 가장 본질적이고, 이게 없으면 아무것도 의미가 없는 것은 
     'CREATE(생성)', 'READ(읽기)' 를 먼저 해보는게 순서이다. 그걸 다 하면 거의 다 끝난것이다. 
    - 먼저 생성하는 것을 살펴보자. 
    - 변수 db에 있는 것을 lowdb의 instance가 들어가 있다. 라고 한다. lowdb의 instance에게 get은 가져온다. topic이라는 것을 가져오고 싶음. 
    정보를 가져오겠다가 아니라, 토픽을 가리키는 무언가를 가져오겠다. 포인터라고 한다. db.get('topic '); 는 topic 자체를 가져오겠다. 

## DATABASE2 lowdb - 5. 조회
    - lodash 자바스크립트에서 굉장히 유명한 라이브러리
    - lowdb의 lo 가 lodash에서 온 걸로 이고잉은 앎
### <수업 진행하다가 찾은 에러 해결 방법> 
~~~Java Script
( 내가 opentutorials.org 에 적은 내용)
안녕하세요! lowdb가 버전을 lowdb 3.0.0 로 업그레이드 하면서 lowdb1.0.0 버전으로 에디터에서 수업을 따라 코드를 
실행하지못하여 저 또한 아래의 코멘트들 참조하여 수업에 참여 하였습니다. pure ESM 으로 수업을 진행하기 위해 lowdb를 
설치한 후에 생성된 package.json에 아래의 코멘트에 적힌 코드를 복붙한 후, 
-복붙한 내용-
lowdb 버전이 바뀌면서 위에 있는 코드로는 작동이 되지않습니다
Pure ESM을 사용해야합니다
Main.js가 있는폴더에 npm init을 하셔서 package.json을 만들어주신다음에
{
"type": "module",
"name": "lowdbpractice",
"version": "1.0.0",
"description": "",
"exports": "./index.js",
"scripts": {
"test": "echo \"Error: no test specified\" && exit 1"
},
"author": "",
"license": "ISC"
}
-복붙한 내용(끝)-
로 내용을 추가 하면 package.json 전체 코드는 이렇게 됨.
{
  "type": "module",
  "name": "lowdbpractice",
  "version": "1.0.0",
  "description": "",
  "exports": "./index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "lodash": "^4.17.21",
    "lowdb": "^3.0.0"
  }
}
~~~
    - https://www.npmjs.com/package/lowdb/v/3.0.0의 Usage 부분의 코드 전체를 복붙하여 수업 따라 가다가, db를 찾아야 할 경우에는 
      아래에 적힌 코드만 main.js 에 추가하면 find함수 실행 가능 합니다. (아래 전체 코드)
~~~Java Script
import { join, dirname } from 'path'
import { Low, JSONFile } from 'lowdb'
import { fileURLToPath } from 'url'
import lodash from 'lodash' // find()함수를 사용하기 위해 추가할 코드

const __dirname = dirname(fileURLToPath(import.meta.url));

const file = join(__dirname, 'db.json')
const adapter = new JSONFile(file)
const db = new Low(adapter)

await db.read()

db.data ||= { topic: [], author: [] }

db.data.author.push({
id:1,
name: 'egoing',
profile: 'developer'
});
db.data.topic.push({
id:1,
title: 'lowdb',
description: 'lowdb is..',
author: 1
});
db.data.topic.push({
id:2,
title: 'mysql',
description: 'mysql is..',
author: 1
});

await db.write(); // write() 를 해야 db.json 파일에 작성 가능

db.chain = lodash.chain(db.data) // find()함수를 사용하기 위해 추가할 코드
const post = db.chain
.get('topic')
.find({ id: 1 })
.value()

console.log(post); // find함수 실행 하면 터미널에 { id: 1, title: 'lowdb', description: 'lowdb is..', author: 1 }가 뜸
~~~

- 참조: [lowdb에서 sorting 하는 법](https://github.com/typicode/lowdb/issues/185)


## DATABASE2 lowdb - 6. 수정
- [How can I delete and update a record/object from db.json? #526](https://github.com/typicode/lowdb/issues/39)
- [Lodash not assigning or updating any data? #473](https://github.com/typicode/lowdb/issues/473)(Good answer for me!)

## DATABASE2 lowdb - 7. 삭제
- [How to remove my matching multiple object fields #457](https://github.com/typicode/lowdb/issues/457)

## DATABASE2 lowdb - 8. id
    - 데이터를 넣을 때, 아이디값을 직접 지정해주었다. 직접 지정하는 것이 상당히 불편한 일이다. MySQL과 같은 DB시스템들은 대부분 
    자동으로 아이디를 매겨주는 체계가 있습니다. MySQL은 AUTO INCREMENT 라는 것이 있다. lodash는 그런 기능이 없다. 
    - ladash는 거의 기능이 없다. 
    - 2개의 옵션을 제공. 
    - shortid 는 모듈의 이름, 랜덤한 값을 생성함. 랜덤한 값은 거의 중복되지 않는 값을 생성한다. 
    - shortid가 deprecated되어서 nanoid로 진행

    
- 참조: [Push Data to Object](https://github.com/typicode/lowdb/issues/213)
~~~Java Script
    // json 파일에 없는 key 값에 대한 데이터를 추가 할 때의 코드 
    // 핵심은 user는 존재하지 않는 키 값이기 때문에 push 로 데이터를 추가 할 수 없다는 것. 그래서 set 함수를 사용하여,
    2번째 인자로 key 값에 대한 value를 추가함
var nid = nanoid();
db.chain
.set('user',{
    id: nid,
    name: 'taeho',
    profile: 'data scientist',
})
.value();

await db.write();
~~~
    - lodash.id는 추가적으로 본인이 공부해 볼 것!

## DATABASE2 lowdb - 9. 비동기 처리
    - 데이터를 추가하는 작업들을 하게 되면, 결국에는 파일에 쓰는 작업. 파일은 IO(Input&Output)작업이라고 해서,  
    CPU를 이용하는 작업들보다, 훨씬 느리기 때문에, 요런식으로 작업하면, 작업이 끝날 때 까지 기다리고 있어야 한다. 
    - 그래서 대용량을 처리할 수 없게 되어 rack 이라는 것이 걸림. 
    - nodejs에서 선택한 방법은 async 라는 비동기 방법인데, 요걸 동기적으로 처리한 것을 보고서, 이상하게 생각할 수 있다.
    - 왜그러냐면, 우리가 FileSync 라는 것을 는데, adapter는 lowdb 가 데이터를 저장하고 읽어올 때, 파일로 읽어올 수 있고, 메모리에서 읽어 올수도 있고,
    localstorage에서도 읽어올 수 있다. 사용자의 기호와 필요에 따라, 쉽게 바꿀 수 있도록 해주는 역할이 import { Low, JSONFile } from 'lowdb' 이
    아이 이다.(이게 이미 async이네, lowdb 깃헙 페이지에)  FileSync(수업에서는) 는 파일을 동기적으로 처리하겠다는 것이다. FileAsync로 바꾸어주면,
    파일을 비동기적으로 처리하는 adapter가 착 달라붙고, 	 

## DATABASE2 lowdb - 10. 수업을 마치며
    - 현실로 돌아가서, 가볍게 쓸만한 데이터베이스가  필요할 때, lowdb 를 이용해서 현실의 문제를 극복해보시면 좋겠습니다. 
      대용량에서 lowdb 사용하면 안됨. 그때는 관계형 데이터베이스 Mysql과 NoSQL과 같은 본격적인 db를 살펴봐야 한다. 
