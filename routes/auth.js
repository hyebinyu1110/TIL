var express = require('express');
var router = express.Router(); // express 모듈의 라우터 함수를 호출함., 라우터 객체 리턴하도록 약속되어 있음
var template = require('../lib/template.js');
var auth = require('../lib/auth.js');
var db = require('../lib//db.js');
var { nanoid } = require("nanoid");


module.exports = function(passport){
  router.get('/login', function (request, response) {
    var feedback = '';
    var fmsg = request.flash();
    if(fmsg.error){
      feedback = fmsg.error[0];
    }
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
  passport.authenticate('local', { 
      failureRedirect: '/auth/login', 
      failureFlash: true, 
      successFlash: true
     }),
  function(request, response){
    request.session.save(function(){
      response.redirect('/');
    })
  })
  
  router.get('/register', function (request, response) {
    var feedback = '';
    var fmsg = request.flash();
    if(fmsg.error){
      feedback = fmsg.error[0];
    }
    var title = 'WEB - login';
    var list = template.list(request.list);
    var html = template.HTML(title, list, `
                  <form action="/auth/register_process" method="post">
                  <div style="color:red;">${feedback}</div>   
                  <p><input type="text" name="email"" placeholder="email" value="hyebinyu1110@gmail.com"></p>
                  <p><input type="password" name="pwd" placeholder="password" value="6362488"></p>
                  <p><input type="password" name="pwd2" placeholder="password" value="6362488"></p>
                  <p><input type="text" name="displayName" placeholder="display name" value="hyebinyu1110"></p>
                  <p>
                    <input type="submit" value="register" />
                  </p>
                </form>
              `, '',
              auth.statusUI(request, response));
    response.send(html);
  });
  
  router.post("/register_process", function (request, response) {
    console.log('request.body', request.body);
    var post = request.body;
    var email = post.email;
    var pwd = post.pwd;
    var pwd2 = post.pwd2;
    var displayName = post.displayName;
    if(pwd !== pwd2){
      request.flash('error', 'Password must be same!')
      response.redirect('/auth/register');
    }else{
      var user = {
        id: nanoid(),
        email: email,
        password: pwd,
        displayName: displayName
      }
 
      request.session.save(function(){
        db.get("users")
        .push(user)
        .write();
        
   })
     
      request.login(user, function(err){
        if(err) return next(err);
      });   

      request.session.save(function(){
           response.redirect('/');
      })
    }
  }); 


  router.get('/logout', function (request, response) {
    request.logout();
    request.session.save(function(){
      response.redirect('/');
    })  
  });


  return router;

}


