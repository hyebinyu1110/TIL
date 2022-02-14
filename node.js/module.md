

# http.createserver


## 1. http.createServer([options][, requestListener]) 메서드
    - http 객체의 createServer() 메서드를 이용하여 데이터를 받을 서버 객체를 생성한 후 반환한다.
    - 첫번째 인자 option에는 생략가능한 인자 http.ServerResponse, ServerResponse, insecureHTTPParser, maxHeaderSize 올 수 있다.
    - 두번째 인자인 requestListener함수는 request(요청) 이벤트에 자동으로 추가되는 함수 이다. 
    
## 2. function (request, response) {} 
    - 익명함수의 인자 request는 객체로서 http통신으로 받은 요청메세지에 대한 객체이다. 
    - http.clientRequest 객체는 http.request()로부터 반환된 내부적으로 생성된 객체이다.
    - http.serverResponse 객체는 http 서버에 의해 내부적으로 생성되며(사용자에 의해서가 아니라,), request(요청) 이벤트의 2번째 인자로 전달된다.

## 3. url.parse(urlString[, parseQueryString[, slashesDenoteHost]])   
    - urlString은 구문분석(parse)할 URL 문자열이다.
    - parseQueryString의 자리에 오는 값은 true 또는 false를 사용하는데, 만약 true를 쓰면, query 속성이 querystring 모듈의 
      parse메서드에 의해 반환된 객체에 항상 포함된다. 
    - url.parse() 메서드는 URL string을 가져와서, 구문분석을 하며, URL 객체를 반환한다.
    * 기억할 점: node.js 공홈 명세에 적히기로는 url.parse() method 사용이 권장되지 않는다고 한다. 개발자는 WHATWG URL API를 사용해야한다.
    - 왜냐면 url.parse() method 는 url을 구문분석할때 관대하고 비표준의 알고리즘을 사용하기에, 보안상 문제가 생길 수 있다. 
    - 예를 들면 호스트이름 spoofing이나 부정확한 사용자 이름과 비밀번호로 사용자 신원확인을 할 수 있다.


## 4. url.parse(urlString[, parseQueryString[, slashesDenoteHost]])



## 5. response.writeHead(statusCode, [statusMessage], [headers])
    - statusCode는 200과 같은 응답 코드
    - statusMessage는 사람이 읽을 수 있는 응답메시지이다. 200의 의미로 OK를 적음
    - headers는 응답헤더이다.
    - response.end(인자)메서드가 호출되기 전에 호출되어야 한다.
    

## 6. response.end([data[, encoding]][, callback])
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
    - The path.parse() method returns an object whose properties represent significant elements of the path. Trailing directory separators are ignored, see path.sep.
    - path.parse()메서드는 path의 중요한 요소를 가지고 있는 객체를 반환한다. 후행 디렉토리 구분 기호는 무시됩니다(path.sep 참조)

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
    
##  9. fs.readFile(path[, options], callback)
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
    - npm install -S sanitize-html을 다운로드 받아야 모듈 사용가능하다. (-S 옵션은 오직 전역이 아니 이 포트에서만 사용가능하도록 하게 한다.)
    - sanitizeHtml 모듈은 카피앤패이스트한 단어에 원하지않는 CSS요소를 제거하는데 유용하다.
    - sanitizeHtml 모듈은 사용자로부터 사용할수 있는 태그를 지정하여 오직 허락된 속성만 사용하도록 하게 한다.
    
##  11. request.on('data', function (data) {

##  12.  request.on('end', function () {

##  13. fs.writeFile(`data/${title}`, description, 'utf8', function (err) {

##  14. var post = qs.parse(body);

##  15.  fs.rename(`data/${id}`, `data/${title}`, function (error) {

    
    
