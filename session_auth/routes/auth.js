var express = require('express');
var router = express.Router(); // express 모듈의 라우터 함수를 호출함., 라우터 객체 리턴하도록 약속되어 있음
var path = require('path');
var fs = require('fs');
var sanitizeHtml = require('sanitize-html');
var template = require('../lib/template.js');
var auth = require('../lib/auth.js');
var bodyParser = require('body-parser');


var authData = {

  email: 'hyebinyu1110@gmail.com',
  password: '6362488',
  nickname: 'hyebinyu1110'
}

router.get('/login', function (request, response) {
  // 처음에는 오류 뜸, topic파일이 없다고 하면서 에러가 뜬다. 그럴때는 이 함수의 순서를 
  //app.get('/topic/:pageId', function (request, response, next) { }보다 앞서 오게 하면 create가 예약어처럼 사용됨 
  // 얘가 먼저 실행이 되고, 그 밑의 함수는 실행되지 않을거기 때문에 에러가 없이 잘 작동하게 됨.  순서가 중요하게 됨. 
  // submit하면  /topic/create_process로 가게 하고 싶으면 
  var title = 'WEB - login';
  var list = template.list(request.list);
  var html = template.HTML(title, list, `
              <form action="/auth/login_process" method="post">
                <p><input type="text" name="email"" placeholder="email"></p>
                <p><input type="password" name="pwd" placeholder="password"></p>
                <p>
                  <input type="submit" value="login" />
                </p>
              </form>
            `, '',
            auth.statusUI(request, response));
  response.send(html);
});

router.post("/login_process", function (request, response) {
  //body-parser라는 코드를 장착하니, 내부 적으로 body-parser가 작동해서 '/create_process' 라우팅할 때 request 객체의 body property에  접근하는 것을 통해, 간결하게 코드 작성 가능
  //topic을 제어하는 것과 관련된 모든 페이지를 topic이라는 경로로 시작하게 하려다 보니, 함수의 순서가 중요하게 됨.
  
  var post = request.body;
  console.log(post);
  var email = post.email;
  var password = post.pwd;
  if (email === authData.email && password === authData.password) {
    //success!!
    request.session.is_logined = true;
    request.session.nickname = authData.nickname;
    request.session.save(function(){
      response.redirect(`/`); // 세션 데이터를 만드는 코드가 오면 된다.
    })
  } else {
    response.end('Who?');
  }
});

router.get('/logout', function (request, response) {
  request.session.destroy(function(err){
    response.redirect('/');
  })  
});


module.exports = router;
