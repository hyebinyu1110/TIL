var express = require('express'); // module에 express 라는 이름을 붙임
var app = express(); // express는 함수라는 뜻이다.
var fs = require('fs');
var compression = require('compression')
var bodyParser = require('body-parser');
var topicRouter = require('./routes/topic');
var indexRouter = require('./routes/index');
var helmet = require('helmet');

var port = 3000;

app.use(helmet());

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false })); // 사용자가 post한 request 객체에 body property 속성을 추가해줌
app.use(compression());
app.get('*', function(request, response, next){
  fs.readdir('./data', function(error, filelist){
    request.list = filelist;
    next();
})
});

app.use('/', indexRouter);
app.use('/topic', topicRouter);

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
