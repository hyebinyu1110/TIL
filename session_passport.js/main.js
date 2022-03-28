var express = require('express'); // module에 express 라는 이름을 붙임
var app = express(); // express는 함수라는 뜻이다.
var fs = require('fs');
var compression = require('compression')
var session = require('express-session');
var bodyParser = require('body-parser');
var helmet = require('helmet');
var FileStore = require('session-file-store')(session);
var flash = require('connect-flash');

app.use(helmet());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false })); // 사용자가 post한 request 객체에 body property 속성을 추가해줌
app.use(compression());
app.get('*', function (request, response, next) {
  fs.readdir('./data', function (error, filelist) {
    request.list = filelist;
    next();
  })
});


app.use(session({
  secret: "keyboard cat",
  resave: false,
  saveUninitialized: true,
  store: new FileStore()
}))

app.use(flash()); //flash 미들웨어를 설치함

  // Set a flash message by passing the key, followed by the value, to request.flash().
  //flash메서드를 호출하면 메소드는 세션 스토어에 내가 입력한 데이터를 추가하도록 되어 있음. 

  // Get an array of flash messages by passing the key to request.flash()
// flash 메시지는 일회용 메시지 이다. 내부적으로 세션 스토어의 데이터를 저장했다,  데이터를 사용하면 그 다음에 지운다는 특성이 있다. 바로 이러한 점을 passport는 활용하고 있다.

var passport = require('./lib/passport')(app);

var topicRouter = require('./routes/topic');
var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth')(passport);

app.use('/', indexRouter);
app.use('/topic', topicRouter);
app.use('/auth', authRouter);


app.use((req, res, next) => { // 미들웨어는 순차적으로 실행이 되어서, 여기까지 찾지 못한 것을 실행함
  res.status(404).send("Sorry can't find that!")
})

app.use((err, req, res, next) => { // next를 통해 전달받을 err 데이터가 담김. 에러가 있을시 4개의 인자를 가진 미들웨어를 호출하는 것으로 정해져 있음. 
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

app.listen(3000, () => {
  console.log(`Example app listening on port 3000`);
})

