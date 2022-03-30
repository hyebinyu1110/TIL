var express = require('express');
var router = express.Router(); // express 모듈의 라우터 함수를 호출함., 라우터 객체 리턴하도록 약속되어 있음
var template = require('../lib/template.js');
var auth = require('../lib/auth.js');

module.exports = function(passport){
  router.get('/login', function (request, response) {
    var fmsg = request.flash();
    var feedback = '';
    if(fmsg.error){
      feedback = fmsg.error[0];
    }
    console.log(request.session);
    var title = 'WEB - login';
    var list = template.list(request.list);
    var html = template.HTML(title, list, `
                 <div style="color:red;">${feedback}</div>   
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
  
  router.post('/login_process',
  passport.authenticate('local', { failureRedirect: '/auth/login', failureFlash: true, successFlash: true }),
  function(request, response){
    request.session.save(function(){
      response.redirect('/');
    })
  })
  
  
  router.get('/logout', function (request, response) {
    request.session.destroy(function(err){
      response.redirect('/');
    })  
  });


  return router;

}


