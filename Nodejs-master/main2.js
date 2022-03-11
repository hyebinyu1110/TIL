var express = require('express'); // module에 express 라는 이름을 붙임
var app = express(); // express는 함수라는 뜻이다.
var fs = require('fs');
var qs = require('querystring');
var template = require('./lib/template.js');

var compression = require('compression')
var bodyParser = require('body-parser');
var topicRouter = require('./routes/topic');
var port = 3000;




app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false })); // 사용자가 post한 request 객체에 body property 속성을 추가해줌
app.use(compression());
app.get('*', function(request, response, next){
  fs.readdir('./data', function(error, filelist){
    request.list = filelist;
    next();
})
});


app.use('/topic', topicRouter);


app.get('/', function(request, response){ // 경로로 사용자가 들어왔을때 호출될 콜백함수
 
    var title = 'Welcome';
    var description = 'Hello, Node.js';
    var list = template.list(request.list);
    var html = template.HTML(title, list,
      `
      <h2>${title}</h2>${description}
      <img src="/images/hello.jpg" style="display: block; width:300px; margin-top:10px;">
      `,
      `<a href="/topic/create">create</a>`
    );
    response.send(html);

});

  app.use((req, res, next) => { // 미들웨어는 순차적으로 실행이 되어서, 여기까지 찾지 못한 것을 실행함
    res.status(404).send("Sorry can't find that!")
  })

  app.use((err, req, res, next) => { // next를 통해 전달받을 err 데이터가 담김. 에러가 있을시 4개의 인자를 가진 미들웨어를 호출하는 것으로 정해져 있음. 
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})

