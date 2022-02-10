var http = require('http');
var fs = require('fs')
var url = require('url'); // 모듈 url
var qs = require('querystring');

function templateHTML(title, list, body) {
  return `
  <!doctype html>
  <html>
  <head>
  <title>WEB - ${title}</title>
 <meta charset="utf-8">
 </head>
 <body>
 <h1><a href="/">WEB2</a></h1>
${list}
<a href="/create">create</a> <a href="/update">update</a>
${body}
 </body>
 </html>
`
}

function templateList(filelist) {
  var list = '<ul>';
  var i = 0;
  while (i < filelist.length) {
    list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
    i = i + 1;
  }
  list = list + '</ul>';
  return list;
}

var app = http.createServer(function (request, response) {
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  var pathname = url.parse(_url, true).pathname;
  console.log(pathname);
  if (pathname === "/") {
    if (queryData.id === undefined) {
      fs.readdir('./data', function (error, filelist) {
        var title = 'welcome';
        var description = 'Hello, node.js'
        var list = templateList(filelist);
        var template = templateHTML(title, list, `<h2>${title}</h2>${description}`);
        response.writeHead(200); // 파일을 성공적으로 전송
        response.end(template);
      })
    } else {
      fs.readdir('./data', function (error, filelist) {
        fs.readFile(`data/${queryData.id}`, 'utf8', function (err, description) {
          var title = queryData.id;
          var list = templateList(filelist);
          var template = templateHTML(title, list, `<h2>${title}</h2>${description}`);
          response.writeHead(200); // 파일을 성공적으로 전송
          response.end(template);
        });
      });

    }

  } else if (pathname === "/create") {
    fs.readdir('./data', function (error, filelist) {
      var title = 'WEB - create';
      var list = templateList(filelist);
      var template = templateHTML(title, list, `
          <form action="http://localhost:3000/create_process" method="post">
        <p><input type="text" name="title" placeholder="title"></p>
    <p>
        <textarea name="description" id="" cols="30" rows="10" placeholder="description"></textarea>
    </p>
    <p>
        <input type="submit">
    </p>
    </form>
`); 
      response.writeHead(200); // 파일을 성공적으로 전송
      response.end(template);

    })
  } else if (pathname === "/create_process") {

    var body = '';
    request.on('data', function(data){

      body = body + data;
    });

    request.on('end', function(){

      var post = qs.parse(body);
      var title = post.title;
      var description = post.description;
      fs.writeFile(`data/${title}`, description, 'utf-8', function(err){
        // err가 있을 경우, err를 처리하는 법을 제공함, 우리는 신경쓰지 않을 것임
        // 콜백이 실행이 된다는 것은, 파일의 저장이 끝났다는 것이다. 
        // 파일의 저장이 끝난 다음, success코드가 있어야 하니 아래 실행
        response.writeHead(302, {Location:`/?id=${title}`}); // 파일을 성공적으로 전송
        response.end('');
  
      })
      console.log(post.title);
    });
     
    
  } else {
    response.writeHead(404);
    response.end('Not Found');

  }


});
app.listen(3000);
