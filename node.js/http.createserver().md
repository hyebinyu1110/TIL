

# http.createserver () {


## 1. http.createServer([options][, requestListener]) 메서드
    - http 객체의 createServer() 메서드를 이용하여 데이터를 받을 서버 객체를 생성한 후 반환한다.
    - 첫번째 인자 option에는 생략가능한 인자 http.ServerResponse, ServerResponse, insecureHTTPParser, maxHeaderSize 올 수 있다.
    - 두번째 인자인 requestListener함수는 request(요청) 이벤트에 자동으로 추가되는 함수 이다. 
    
## 2. function (request, response) {} 
    - 익명함수의 인자 request는 객체로서 http통신으로 받은 요청메세지에 대한 객체이다. 
    - http.clientRequest 객체는 http.request()로부터 반환된 내부적으로 생성된 객체이다.
    - http.serverResponse 객체는 http 서버에 의해 내부적으로 생성되며(사용자에 의해서가 아니라,), 
      request(요청) 이벤트의 2번째 인자로 전달된다.

## 3. url.parse(urlString[, parseQueryString[, slashesDenoteHost]]) { }  
    - urlString은 구문분석(parse)할 URL 문자열이다.
    - parseQueryString의 자리에 오는 값은 true 또는 false를 사용하는데, 만약 true를 쓰면, query 속성이 querystring 모듈의 
      parse메서드에 의해 반환된 객체에 항상 포함된다. 
    - url.parse() 메서드는 URL string을 가져와서, 구문분석을 하며, URL 객체를 반환한다.
    * 기억할 점: node.js 공홈 명세에 적히기로는 url.parse() method 사용이 권장되지 않는다고 한다. 개발자는 WHATWG URL API를 사용해야한다.
    - 왜냐면 url.parse() method 는 url을 구문분석할때 관대하고 비표준의 알고리즘을 사용하기에, 보안상 문제가 생길 수 있다. 
    - 예를 들면 호스트이름 spoofing이나 부정확한 사용자 이름과 비밀번호로 사용자 신원확인을 할 수 있다.


## 4. http.IncomingMessage 객체
    - IncomingMessage 객체는 http.Server 와 http.ClientRequest 에 의해 생성되고, request와 response 이벤트의 첫번째 인자로 
      각각 전달 된다. 또한 응답 상태(예: 200), 헤더, 데이터에 접근하기 위해사용된다.
    - <stream.Duplex>의 하위 클래스인 socket value와 다른 점은  IncomingMessage 자체가 <stream.Readable>를 확장한다는 것이다. 
      또한 IncomingMessage 객체는 keep-alive 옵션의 경우, 밑의 기반이 되는 소켓이 여러 번 재사용 될 때에, 들어오는 HTTP 헤더와
      payload를 따로 구문분석하고 내보내기 위해 각각 생성된다.


## 5. response.writeHead(statusCode, [statusMessage], [headers]){ }  
    - statusCode는 200과 같은 응답 코드
    - statusMessage는 사람이 읽을 수 있는 응답메시지이다. 200의 의미로 OK를 적음
    - headers는 응답헤더이다.
    - response.end(인자)메서드가 호출되기 전에 호출되어야 한다.
    

## 6. response.end([data[, encoding]][, callback]){ }  
    - 이 메서드는 모든 응답헤더와 바디가 보내어졌음을 서버에게 신호를 보내는 의미다.
    - response.end()메서드는  각각의 응답마다 마지막에 반드시 호출되어야 한다.
    - 만약 data와 encoding인자가 주어졌다면 data가 웹브라우저에 선택된 인코딩 방식으로 렌더링 되어 보여진다.
    - callback함수는 응답 스트림이 다 끝나고 수행되는 함수이다.
    
    
## 7. fs.readdir('./data', function (error, filelist) {
    - fs.readdir(path[, options], callback) 메서드
    - path는 문자열, URL, 버퍼가 됨
    - option은 인코딩 방식이나, fileType이 옴
    - callback함수는 (err, files) 두 인자를 받는데, files인자는 '.' 과'..'을 제외한  다이렉터리 내  파일들의 이름의 배열을 가지고 있다.
   
   
## 8. path.parse(queryData.id).base 
    - The path.parse() method returns an object whose properties represent significant elements of the path. 
     Trailing directory separators are ignored, see path.sep.
    - path.parse()메서드는 path의 중요한 요소를 가지고 있는 객체를 반환한다. 후행 디렉토리 구분 기호는 무시된다(path.sep 참조)

~~~Java Script
- path.parse('/home/user/dir/file.txt');
// Returns:
// { root: '/',
//   dir: '/home/user/dir',
//   base: 'file.txt',
//   ext: '.txt',
//   name: 'file' }
┌─────────────────────┬────────────┐
│          dir        │    base    │
├──────┬              ├──────┬─────┤
│ root │              │ name │ ext │
"  /    home/user/dir / file  .txt "
└──────┴──────────────┴──────┴─────┘
(All spaces in the "" line should be ignored. They are purely for formatting.)
~~~   
    
##  9. fs.readFile(path[, options], callback){ }  
    - 비동기적으로 파일의 전체 내용을 읽어들인다. 
    - path는 파일이름이나 파일 경로이다.
    - option은 파일 인코딩 방식 등 올 수 있다.
    - callback 함수는  err와 data 2개의 인자를 전달 받는다. 
 
 ~~~Java Script
import { readFile } from 'fs';   
// 예전에는 var fs = require('fs') 하는 식으로 모듈을 불러들였는데 자바스크립트 ECMA 스크립트 버전이 업그레이드 되면서 
// 방식이 바꼈나보다

readFile('/etc/passwd', (err, data) => { // 두번째 인자 callback 함수
  if (err) throw err;
  console.log(data);
});

~~~   
    - callback 함수는  err와 data 2개의 인자를 전달 받으며 data는 파일의 내용을 가지고 있다. 
    - 인코딩 방식이 명세되어 있지 않다면, 버퍼 내 raw data 그대로 웹브라우저에 보내어 진다. 
    - 만약 options이 string이라면 인코딩 방식을 필요로한다.

 ~~~Java Script
import { readFile } from 'fs';

readFile('/etc/passwd', 'utf8', callback);
 ~~~     

##  10. sanitizeHtml 모듈
    - npm install -S sanitize-html을 다운로드 받아야 모듈 사용가능하다. 
    (-S 옵션은 오직 (전역이 아닌) 이 포트(3000)에서만 사용가능하도록 하게 한다.)
    - sanitizeHtml 모듈은 카피앤패이스트한 단어에 원하지않는 CSS요소를 제거하는데 유용하다.
    - sanitizeHtml 모듈은 사용자로부터 사용할수 있는 태그를 지정하여 입력창에 오직 허락된 속성(예: <h1>, <a>)만 사용하도록 하게 한다.
    
##  11. request.on('data', function (data) { }  
- 참조: [node.js 공홈 Event 모듈 글](https://nodejs.org/api/events.html#eventsonceemitter-name-options)
       
        - Node.js 의 핵심 API는 대부분 관용적인 비동기적 이벤트 구동 아키텍쳐라고 한다. 이 말은, 어떤 특정 종류의 객체(이른바 emitter)는 
       명명된 이벤트를 방출하는데, 이 이벤트는 함수 객체가 호출되도록 야기한다. (node.js 공홈 내용)
     => 나의 짧은 자바스크립트 지식을 바탕으로 이해한 바 로는 '관용적인' 이라는 말은 (네이버 영어사전 :언어 표현이 모국어 사용자가 쓰는 
       것같이) 자연스럽게, 까다로운 문법 방식이 아니라, 편하게 함수를 추가 할수 있다고 이야기 하는 것 같다. 가령 이벤트 발생시
       콜백 함수 추가를 편하게 on을 써서 할 수 있다.
       
      - 예를들면, fs.ReadStream는 파일이 열릴때 이벤트를 발생시키고, stream은 데이터가 읽기가 가능하다면 언제든지 이벤트를 발생시킨다. 
      - 또한, 이벤트를 발생시키는 모든 객체는 EventEmitter class 의 자식들이다. 따라서 이러한 객체들은 eventEmitter.on() 의 형태로  
        객체에 의해 발생한 명명된 이벤트에(예를 들면 'data' 이벤트에) 한 개 이상의 이벤트 함수를 추가 할 수 있다.
        (이벤트 발생시 호출되는 함수)
        
    => 이 말은 JS에서 object.addEventLister('click', function); 식으로 이벤트 리스너 함수 추가 하는것과 같이 onclick=function(){})
      으로 함수 추가 할수 있다고 이야기하는것과 비슷한 맥락인거 같다. 자유롭게 함수가 추가 가능하다!
      
      - 또한 EventEmitter 객체가 이벤트를 방출할때, 이 특정 이벤트에 연결된 모든 함수들이 동기적으로 호출된다. 
      또한 호출된 리스너(콜백함수)에 의해 반환된 values들은 무시되고, 버려진다.
      - 아래의 예시는 하나의 리스너를 가진 간단한 EventEmitter instance 의 형태이다. eventEmitter.on() 메서드는 리스너를 추가하는데 
      쓰이고, eventEmitter.emit()는 함수를 trigger 시키는데 쓰인다. (공홈 내용 참조)

~~~Java Script
const EventEmitter = require('events');
class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();
myEmitter.on('event', () => {
  console.log('an event occurred!');
});
myEmitter.emit('event');
~~~  

##  11-1. 객체.on('data', function (data) { }   
    - 위의 11번의 설명을 토대로 
    - request 라는 객체에 data 라는 이벤트가 발생시 실행시킬 함수를 추가한다. 

##  11-2. 객체.on('end', function () { }  
    - 위의 11번의 설명을 토대로 
    - request 라는 객체에 end 라는 이벤트가 발생시 실행시킬 함수를 추가한다. 

##  13. fs.writeFile(file, data[, options], callback){ }  
    - file: filename 이나 file descriptor 명시
    - data: 파일에 적힐 내용
    - options: 생략가능하며, 파일 인코딩 방식 등이 올 수 있다. (utf8)(데이터가 버퍼 면 생략)
    - callback: 파일이 create 된 후 호출될 함수
    - 예시: fs.writeFile(`data/${title}`, description, 'utf8', function (err) { }
    - 파일명이 존재하면 파일 내용(description)응 수정하고, 파일명이 없으면, 새로 파일 생성하여 파일 내용을 적는다. 

##  12. querystring.parse(str[, sep[, eq[, options]]]){ }
    - querystring.parse() method 는 URL query 문자열을 key와 value 값을 가진 쌍으로 구문분석하기 위해 쓰인다. 
    => 구문분석한 쌍을 key와 value를 가진 객체로 반환
    - str: 구문분석할 URL 문의 문자열(query string)
    - sep: str(URL 문의 문자열) 중 key와 value를 가진 한 쌍을 다른 한 쌍과 구분짓는 데 쓰이는 쓰는 문자열(예: &)
    - eq: str(URL 문의 문자열) 중 key와 value를 한 쌍으로 만드는 범위를 짓기위해 쓰는 문자열(예: =)
    - 예를들면, the query string 
    'foo=bar&abc=xyz&abc=123' 는 아래와 같이 구문분석 될 것이다.

~~~Java Script
{
  foo: 'bar',
  abc: ['xyz', '123']
}
~~~
##  13.  fs.rename(oldPath, newPath, callback) { }
    - 비동기적으로 oldPath에 있는 파일을 newPath에 제공된 pathname으로 변경한다. newPath가 이미 존재 한다면, 파일 이름이 겹쳐 쓰일 것이다. 
    - newPath에 있는게 다이렉터리라면, 에러가 대신 발생할 것이다. 
    - 가능한 예외(err)가 아닌 어떠한 인자도 fs.rename 함수가 수행된 후 호출되는 컬백함수에 제공되지 않는다.
    - 예: fs.rename(`data/${id}`, `data/${title}`, function (error) {
    
~~~Java Script
import { rename } from 'fs';

rename('oldFile.txt', 'newFile.txt', (err) => {
  if (err) throw err;
  console.log('Rename complete!');
});
~~~

 ##  14.  fs.unlink(path, callback) { }
     - 인자인 path에 위치한 파일이나 심볼릭 링크를 비동기적으로 삭제한다. 
     - 가능한 예외(err)가 아닌 어떠한 인자도 fs.unlink 함수가 수행된 후 호출되는 컬백함수에 제공되지 않는다.
     - fs.unlink() 는 다이렉터리 삭제에는 적용되지 않고(비어있는 다이렉터라 하더라도), 대신 다이렉터리 삭제의 경우 fs.rmdir()를 사용한다. 
     - fs.unlink() will not work on a directory, empty or otherwise(비어있든지 아니든지). To remove a directory, use fs.rmdir().
    
~~~Java Script
import { unlink } from 'fs';
// Assuming that 'path/file.txt' is a regular file.
unlink('path/file.txt', (err) => {
  if (err) throw err;
  console.log('path/file.txt was deleted');
});
~~~

}
