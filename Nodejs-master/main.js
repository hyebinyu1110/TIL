var express = require('express');
var app = express(); // express 라고 하는 모듈자체, 애플리케션이라고 하는 객체를 리턴함.
var compression = require('compression');
var qs = require('querystring');
var fs = require('fs');
var bodyParser = require('body-parser');
var template = require('./lib/template.js');
var topicRouter = require('./routes/topic.js');

app.use('/topic', topicRouter); 
// '/topic'으로 시작하는 주소들에게 topicRouter라고 하는 이름의 미들웨어를 적용하겠다는 뜻
// topic.js 파일 내 라우팅 하는 함수들은 /topic 경로 생략해야함.

app.use(express.static('public')); // public 디렉터리 아래에서 정적 파일을 찾겠다.(public폴더 외에는 접근이 안되서 훨씬 안전함) => 정적인 파일을 서비스하고 싶은 디렉터리를 직접 지정해 주면 된다. 
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));// 괄호 내부에 미들웨어가 들어옴. 저부분은 바디파서가 만들어내는 미들웨어를 표현하는 표현식.
// 바디파서를 저렇게 하면, main.js가 실행될 때마다(사용자가 요청할 때마다), 괄호내부의 코드에 의해 만들어진 미들웨가 실행된다. 어떻게 생겼는지는 알 필요가 없다.
// 내부적으로 사용자가 보낸 post를 내부적으로 분석해서 모든 데이터를 가져와, create_process에서 콜백을 호출하도록 되어 있음. 콜백함수의 첫번째 인수인 request에
// body property 가 원래 없었지만, 그걸 body-parser라는 미들웨어가 만들어줌. 
// 어려우면 이해 못해도 괜찮다라는 마음으로 보기.
app.use(compression()); // use() 함수를 이용해 객체에 미들웨어를 등록하는 것.
app.get('*', function (request, response, next) {
   // 들어오는 모든 요청이 아닌 get방식으로 들어오는 요청에 대해서만, 파일 목록을 가져오는 코드가 들어가게 됨. post방식은 처리가 안됨.
   // 여기서 미들웨어 함수를 등록하여 미들웨어의 핵심은 request 와 response 객체를 받아서 변형할 수 있다. 
   //next를 호출하여 그 다음에 실행되어야할 미들웨어 실행여부를 그 미들웨어의 이전 미들웨어가 결정하도록 한다. 
  fs.readdir('./data', function (error, filelist) {

    request.list = filelist; // data 폴더에있는 파일의 목록이 배열로 담겨져 있다. 
    next(); //next라는 변수에는 그 다음에 호출되어야할 미들웨어가 담겨있다. 
  }); //코드 중 반복되는 부분을 정리하기위해 미들웨어 사용. => 코드량을 획기적으로 줄일수 있다.
})
const port = 3000;

//route, routing

// app.get('/', (request, response) => {  response.send('Hello World!')});

app.get('/', function (request, response) {

  var title = 'Welcome';
  var description = 'Hello, Node.js';
  var list = template.list(request.list);
  var html = template.HTML(title, list,
    `<h2>${title}</h2>${description}
    <img src="/images/hello.jpg" style="width:300px; display:block; margin-top: 10px;">
    `,
    `<a href="/topic/create">create</a>`
  );
  response.send(html);
});



app.listen(port, () => { console.log(`Example app listening on port ${port}`) });

app.use(function(request, response, next) { //  에러 관리 미들웨어 추가한 것
  // 얘 혼자 다른 미들웨어와 달리 마지막에 추가한 이유는 더이상 실행하지 못하고 여기까지 오면 못찾은 거니까 그때 404 상태메세지를 보내 에러 처리함

  app.use((err, req, res, next) => { // 얘를 위에다가 쓰면 안됨. // 위의 미들웨어 함수에 next함수가 인수로 주어져서, 인자로 err가 주어지면(에러발생시) 쓰는 함수의 인자를 4개로 쓰기로 정해져 있음
    console.error(err.stack);
    res.status(500).send('Something broke!');
  })
  response.status(404).send(`sorry can't find that!`);
})

