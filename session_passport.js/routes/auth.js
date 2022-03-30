var express = require('express');
var router = express.Router(); // express 모듈의 라우터 함수를 호출함., 라우터 객체 리턴하도록 약속되어 있음
var template = require('../lib/template.js');
var auth = require('../lib/auth.js');


module.exports = function(passport){
  router.get('/login', function (request, response) {
    // 처음에는 오류 뜸, topic파일이 없다고 하면서 에러가 뜬다. 그럴때는 이 함수의 순서를 
    //app.get('/topic/:pageId', function (request, response, next) { }보다 앞서 오게 하면 create가 예약어처럼 사용됨 
    // 얘가 먼저 실행이 되고, 그 밑의 함수는 실행되지 않을거기 때문에 에러가 없이 잘 작동하게 됨.  순서가 중요하게 됨. 
    // submit하면  /topic/create_process로 가게 하고 싶으면 
    var fmsg = request.flash();
    var feedback = '';
    if(fmsg.error){
      feedback = fmsg.error[0];
    }
    var title = 'WEB - login';
    var list = template.list(request.list);
    var html = template.HTML(title, list, `
                <form action="/auth/login_process" method="post">
                <div style="color: red;">${feedback}</div>
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
  
  
  router.post('/login_process', // 로그인 폼에서 auth/login_process로 전송한 데이터를 passport가 받도록 함.
              //그 때 전송된 데이터는 local 전략(id와 password로 로그인하는 전략으로 처리하겠다.)   
  passport.authenticate('local', { failureRedirect: '/auth/login', failureFlash: true, successFlash: true}),
  function(request, response) {
    request.session.save(function(){
      response.redirect('/');
    })
  });
  
  
  router.get('/logout', function (request, response) {
    // request.session.destroy(function(err){
    //   response.redirect('/');
    // })  
    request.logout();
    response.redirect('/');
  });

  return router;
}
