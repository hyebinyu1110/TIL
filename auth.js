var express = require('express');
var router = express.Router(); // express 모듈의 라우터 함수를 호출함., 라우터 객체 리턴하도록 약속되어 있음
var path = require('path');
var fs = require('fs');
var sanitizeHtml = require('sanitize-html');
var template = require('../lib/template.js');
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
            `, '');
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
    response.redirect(`/`); // 세션 데이터를 만드는 코드가 오면 된다.

  } else {

    response.end('Who?');

  }


});




/* // 주석되어 있는 부분을 참조해 가며 코딩 함.
router.use(bodyParser.urlencoded({ extended: false }));
router.get('*', function (request, response, next) {
    // 들어오는 모든 요청이 아닌 get방식으로 들어오는 요청에 대해서만, 파일 목록을 가져오는 코드가 들어가게 됨. post방식은 처리가 안됨.
    // 여기서 미들웨어 함수를 등록하여 미들웨어의 핵심은 request 와 response 객체를 받아서 변형할 수 있다. 
    //next를 호출하여 그 다음에 실행되어야할 미들웨어 실행여부를 그 미들웨어의 이전 미들웨어가 결정하도록 한다. 
   fs.readdir('./data', function (error, filelist) {
 
     request.list = filelist; // data 폴더에있는 파일의 목록이 배열로 담겨져 있다. 
     next(); //next라는 변수에는 그 다음에 호출되어야할 미들웨어가 담겨있다. 
   }); //코드 중 반복되는 부분을 정리하기위해 미들웨어 사용. => 코드량을 획기적으로 줄일수 있다.
 })

   
 router.get('/:pageId', function (request, response, next) { //url path 방식으로 parameter를 전달하는 것을 처리하는 라우팅 기법을 살펴봄. 

    var filteredId = path.parse(request.params.pageId).base;
    fs.readFile(`./data/${filteredId}`, 'utf8', function (err, description) {
      if(err) {
        next(err); // 밑에 인자가 4개인 함수로 등록된 미들웨어가 호출됨.
        
      }else{
        var title = request.params.pageId;
        var sanitizedTitle = sanitizeHtml(title);
        var sanitizedDescription = sanitizeHtml(description, {
          allowedTags: ['h1']
        });
        var list = template.list(request.list);
        var html = template.HTML(sanitizedTitle, list,
          `<h2>${sanitizedTitle}</h2>${sanitizedDescription}`,
          ` <a href="/topic/create">create</a>
                <a href="/topic/update/${sanitizedTitle}">update</a>
                <form action="/topic/delete_process" method="post">
                  <input type="hidden" name="id" value="${sanitizedTitle}">
                  <input type="submit" value="delete">
                </form>`
        );
        response.send(html);
      }
  
    });
  })
  
 
  
  router.get('/update/:pageId', function (request, response) { // 결국엔 여기있는 콜백함수가 미들웨어였다.... express에서는 모든게 사실 미들웨어이다.
    //미들은 가운데라는 뜻, 애플리케이션이 구동될때, 순서대로 등록되어 있는 조그만 프로그램들이 실행되는, 각각의 프로그램들이, 서로와 서로를 연결해주는 작은 소프트웨어라는 점에서
    //미들웨어라는 표현을 쓰는것이 아닌가, 이고잉은 생각한다.
    // 나의 미들웨어를 만드는 방법을 살펴봄. 
  
    var filteredId = path.parse(request.params.pageId).base;
    fs.readFile(`data/${filteredId}`, 'utf8', function (err, description) {
      var title = request.params.pageId;
  
      var list = template.list(request.list);
      var html = template.HTML(title, list,
        `
            <form action="/topic/update_process" method="post">
              <input type="hidden" name="id" value="${title}">
              <p><input type="text" name="title"  value="${title}"></p>
              <p>
                <textarea name="description">${description}</textarea>
              </p>
              <p>
                <input type="submit">
              </p>
            </form>
            `,
        `<a href="/topic/create">create</a> <a href="topic/update/${filteredId}">update</a>`
      );
      response.send(html);
    });
  });
  
  
  router.post('/update_process', function (request, response) {
    var post = request.body;
    var id = post.id;
    var title = post.title;
    var description = post.description;
    fs.rename(`data/${id}`, `data/${title}`, function (error) {
      fs.writeFile(`data/${title}`, description, 'utf8', function (err) {
        response.redirect(`/topic/${title}`);
      })
    });
  });
  
  
  router.post('/delete_process', function (request, response) {
  
    var post = request.body;
    console.log(post);
    var id = post.id;
    var filteredId = path.parse(id).base;
    fs.unlink(`data/${filteredId}`, function (error) {
      response.redirect('/');
    })
  });


  app.use(function(request, response, next) { //  에러 관리 미들웨어 추가한 것
    // 얘 혼자 다른 미들웨어와 달리 마지막에 추가한 이유는 더이상 실행하지 못하고 여기까지 오면 못찾은 거니까 그때 404 상태메세지를 보내 에러 처리함
  
    app.use((err, req, res, next) => { // 얘를 위에다가 쓰면 안됨. // 위의 미들웨어 함수에 next함수가 인수로 주어져서, 인자로 err가 주어지면(에러발생시) 쓰는 함수의 인자를 4개로 쓰기로 정해져 있음
      console.error(err.stack);
      res.status(500).send('Something broke!');
    })
    response.status(404).send(`sorry can't find that!`);
  })
  */
module.exports = router;