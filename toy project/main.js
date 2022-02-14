var http = require('http');
var fs = require('fs')
var url = require('url'); // 모듈 url
var qs = require('querystring');
var template = require('./lib/template.js');
var path = require('path');
var sanitizeHtml = require('sanitize-html');

var app = http.createServer(function (request, response) {
  var _url = request.url; // request 객체의 url 속성값 을 대입
  var queryData = url.parse(_url, true).query;
  var pathname = url.parse(_url, true).pathname;

  if (pathname === "/") { // URL뒤 상세경로의 pathname이 '/' 이면, 
    if (queryData.id === undefined) {// 만약 queryString이 없으면(즉 메인 페이지 이면)
      fs.readdir('./data', function (error, filelist) {
        var title = 'welcome';
        var description = 'Hello, node.js'
        var list = template.list(filelist);
        var HTML = template.HTML(title, list,
          `<h2>${title}</h2>${description}`,
          `<a href="/create">create</a>`);
        response.writeHead(200); // 파일을 성공적으로 전송
        response.end(HTML);
      });
    } else {
      fs.readdir('./data', function (error, filelist) {
        var filteredId = path.parse(queryData.id).base; // 보안을 위해 파일경로의 파일이름만 필터하여 filteredId로 대입
        fs.readFile(`data/${filteredId}`, 'utf8', function (err, description) {
          var title = queryData.id;
          var sanitizedTitle = sanitizeHtml(title);
          var sanitizedDescription = sanitizeHtml(description, {

            allowedTags: ['h1']
          }
            ); 
          var list = template.list(filelist);
          var HTML = template.HTML(title, list,
            `<h2>${ sanitizedTitle}</h2>${sanitizedDescription}`,
            `<a href="/create">create</a>
             <a href="/update?id=${sanitizedTitle}">update</a>
             <form action="delete_process" method="post">
             <input type="hidden" name="id" value="${sanitizedTitle}">
             <input type="submit" value="delete">
             </form>`
             );
          response.writeHead(200); // 파일을 성공적으로 전송
          response.end(HTML);
     
        });
      });
    }
  } else if (pathname === "/create") {
    fs.readdir('./data', function (error, filelist) {
      var title = 'WEB - create';
      var list = template.list(filelist);
      var HTML = template.HTML(title, list, `
          <form action="/create_process" method="post">
        <p><input type="text" name="title" placeholder="title"></p>
    <p>
        <textarea name="description" id="" cols="30" rows="10" placeholder="description"></textarea>
    </p>
    <p>
        <input type="submit">
    </p>
    </form>
`, '');
      response.writeHead(200); // 파일을 성공적으로 전송
      response.end(HTML);

    })
  } else if (pathname === "/create_process") {

    var body = '';
    request.on('data', function (data) {

      body = body + data;
    });

    request.on('end', function () {

      var post = qs.parse(body);
      var title = post.title;
      var description = post.description;
      fs.writeFile(`data/${title}`, description, 'utf8', function (err) {
        // err가 있을 경우, err를 처리하는 법을 제공함, 우리는 신경쓰지 않을 것임
        // 콜백이 실행이 된다는 것은, 파일의 저장이 끝났다는 것이다. 
        // 파일의 저장이 끝난 다음, success코드가 있어야 하니 아래 실행
        response.writeHead(302, { Location: `/?id=${title}` }); // 파일을 성공적으로 전송
        response.end('');

      })

    });

  } else if (pathname === '/update') {

    fs.readdir('./data', function (error, filelist) {
      var filteredId = path.parse(queryData.id).base;
        fs.readFile(`data/${filteredId}`, 'utf8', function (err, description) {
        var title = queryData.id;
        var list = template.list(filelist);
        var HTML = template.HTML(title, list,
          `
          <form action="/update_process" method="post">
          <input type="hidden" name="id" value="${title}">
          <p><input type="text" name="title" placeholder="title" value="${title}"></p>
          
      <p>
          <textarea name="description" placeholder="description">${description}</textarea>
      </p>
      <p>
          <input type="submit">
      </p>
      </form>
          `,
          `<a href="/create">create</a> <a href="/update?id=${title}">update</a>`);
        response.writeHead(200); // 파일을 성공적으로 전송
        response.end(HTML);
      });
    });

  } else if (pathname === "/update_process") {
    var body = '';
    request.on('data', function (data) {

      body = body + data;

    });

    request.on('end', function () {

      var post = qs.parse(body);
      console.log(post);
      var id = post.id;
      var title = post.title;
      var description = post.description;
  
      fs.rename(`data/${id}`, `data/${title}`, function (error) {
        fs.writeFile(`data/${title}`, description, 'utf8', function (err) {
          response.writeHead(302, { Location: `/?id=${title}` });
          response.end();

        });
      });
    })
    
  } else if (pathname === "/delete_process") {
    
        var body = '';
         request.on('data', function (data) {
          body = body + data; 
        });
        request.on('end', function () {
          var post = qs.parse(body);
          var id = post.id;
          var filteredId = path.parse(id).base;
           fs.unlink(`data/${filteredId}`, function(error){
            response.writeHead(302, { Location: `/` });  // 302는 redirection  을 의미
            response.end();
          })
         
        });
        
  
}else {
    response.writeHead(404);
    response.end('Not Found');

  }


});
app.listen(3000);
