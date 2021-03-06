var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var template = require('./lib/template.js');
var path = require('path');
var sanitizeHtml = require('sanitize-html');
var cookie = require('cookie');




function loginUser(request, response) { // 함수를 만듬으로써, 훨씬 더 가독성 높은 코드를 만들어줌.
  var isUserLogined = false;

  var cookies = {}; // 값이 없는 경우에도 밑의 코드에서 사용할 수 있도록 빈 객체를 만들어줌.

  if (request.headers.cookie !== undefined) {
 
    cookies = cookie.parse(request.headers.cookie);

  }

  if (cookies.name === "hyebinyu1110@gmail.com" && cookies.password === "6362488") {

    isUserLogined = true;

  }
  console.log(isUserLogined);
    return isUserLogined;

}

function authStatusUI(request, response) {

  var login = `<a href="/login">login</a>`

  if (loginUser(request, response)) {
  
    login = `<a href="/logout_process">log-out</a>`;
  }

  console.log(login);
  return login;
}

var app = http.createServer(function (request, response) {
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  var pathname = url.parse(_url, true).pathname;


  if (pathname === '/') {
    if (queryData.id === undefined) {
      fs.readdir('./data', function (error, filelist) {
        var title = 'Welcome';
        var description = 'Hello, Node.js';
        var list = template.list(filelist);
        var html = template.HTML(title, list,
          `<h2>${title}</h2>${description}`,
          `<a href="/create">create</a>, `,
          authStatusUI(request, response)
        );
        response.writeHead(200);
        response.end(html);
      });
    } else {
      fs.readdir('./data', function (error, filelist) {
        var filteredId = path.parse(queryData.id).base;
        fs.readFile(`data/${filteredId}`, 'utf8', function (err, description) {
          var title = queryData.id;
          var sanitizedTitle = sanitizeHtml(title);
          var sanitizedDescription = sanitizeHtml(description, {
            allowedTags: ['h1']
          });
          var list = template.list(filelist);
          var html = template.HTML(sanitizedTitle, list,
            `<h2>${sanitizedTitle}</h2>${sanitizedDescription}`,
            ` <a href="/create">create</a>
                <a href="/update?id=${sanitizedTitle}">update</a>
                <form action="delete_process" method="post">
                  <input type="hidden" name="id" value="${sanitizedTitle}">
                  <input type="submit" value="delete">
                </form>`,
            authStatusUI(request, response)

          );


          response.writeHead(200);
          response.end(html);

        });
      });
    }
  } else if (pathname === '/create') {

    if (loginUser(request, response)) {
      fs.readdir('./data', function (error, filelist) {
        var title = 'WEB - create';
        var list = template.list(filelist);
        var html = template.HTML(title, list, `
          <form action="/create_process" method="post">
            <p><input type="text" name="title" placeholder="title"></p>
            <p>
              <textarea name="description" placeholder="description"></textarea>
            </p>
            <p>
              <input type="submit">
            </p>
          </form>
        `, '',
          authStatusUI(request, response)

        );
        response.writeHead(200);
        response.end(html);
      });
    } else {
      response.writeHead(404);
      response.end(`Login first needed`);
    }
  } else if (pathname === '/create_process') {
    var body = '';
    request.on('data', function (data) {
      body = body + data;
    });
    request.on('end', function () {
      var post = qs.parse(body);
      var title = post.title;
      var description = post.description;
      fs.writeFile(`data/${title}`, description, 'utf8', function (err) {
        response.writeHead(302, { Location: `/?id=${title}` });
        response.end();
      })
    });
  } else if (pathname === '/update') {
    fs.readdir('./data', function (error, filelist) {
      var filteredId = path.parse(queryData.id).base;
      fs.readFile(`data/${filteredId}`, 'utf8', function (err, description) {
        var title = queryData.id;
        var list = template.list(filelist);
        var html = template.HTML(title, list,
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
          `<a href="/create">create</a> <a href="/update?id=${title}">update</a>`,
          authStatusUI(request, response)

        );
        response.writeHead(200);
        response.end(html);
      });
    });
  } else if (pathname === '/update_process') {
    var body = '';
    request.on('data', function (data) {
      body = body + data;
    });
    request.on('end', function () {
      var post = qs.parse(body);
      var id = post.id;
      var title = post.title;
      var description = post.description;
      fs.rename(`data/${id}`, `data/${title}`, function (error) {
        fs.writeFile(`data/${title}`, description, 'utf8', function (err) {
          response.writeHead(302, { Location: `/?id=${title}` });
          response.end();
        })
      });
    });
  } else if (pathname === '/delete_process') {
    var body = '';
    request.on('data', function (data) {
      body = body + data;
    });
    request.on('end', function () {
      var post = qs.parse(body);
      var id = post.id;
      var filteredId = path.parse(id).base;
      fs.unlink(`data/${filteredId}`, function (error) {
        response.writeHead(302, { Location: `/` });
        response.end();
      })
    });
  } else if (pathname === "/login") {
    fs.readdir('./data', function (error, filelist) {
      var title = 'login';
      var list = template.list(filelist);
      var html = template.HTML(title, list,
        `<form action="/login_process" method="post">
          <p><input type="text" name="name" placeholder="type your username" /></p>
          <p><input type="password" name="password" placeholder="password" /></p>
          <p><input type="submit" value="submit" />
          </form>
          `,
        ``,
        authStatusUI(request, response)
      );
      response.writeHead(200);
      response.end(html);
    });
  } else if (pathname === '/login_process') {
    var body = '';
    request.on('data', function (data) {
      body = body + data;
    });

    request.on('end', function () {
      var post = qs.parse(body);
      if (request.headers.cookie === undefined) {
        if (post.name === "hyebinyu1110@gmail.com" && post.password === "6362488") {
            response.setHeader('Set-Cookie', [
              `name=${post.name}`,
              `password=${post.password}`
            ]);
            response.writeHead(302, {Location:`/`});
            response.end();
      
        } else {
          response.writeHead(404);
          response.end('wrong login info, please try again');
        }

      } else {
        if (post.name === "hyebinyu1110@gmail.com" && post.password === "6362488") {
          response.writeHead(302, {Location:`/`});
          response.end();
          

        } else {
          response.writeHead(404);
          response.end('wrong login info, please try again');
        }
      }
    })
  } else if (pathname === '/logout_process') {
    response.setHeader('Set-Cookie', [
      `name=; Max-Age=0`,
      `password=; Max-Age=0`,
    ])
    response.writeHead(302, { Location: `/` });
    response.end();
  } else {
    response.writeHead(404);
    response.end('Not found');
  }
});
app.listen(3000);
