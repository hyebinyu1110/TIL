var http = require('http');
var fs = require('fs')
var url = require('url'); // 모듈 url
var qs = require('querystring');
var topic = require('./lib/topic.js');
var author = require('./lib/author.js');

var app = http.createServer(function (request, response) {
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  var pathname = url.parse(_url, true).pathname;
  if (pathname === "/") {
    if (queryData.id === undefined) {
      topic.home(request, response);
    } else {
      topic.page(request, response);
    }
  } else if (pathname === "/create") {
    topic.create(request, response);
  } else if (pathname === "/create_process") {
    topic.create_process(request, response);
  } else if (pathname === '/update') {
    topic.update(request, response);
  } else if (pathname === "/update_process") {
    topic.update_process(request, response);
  } else if (pathname === "/delete_process") {
    topic.delete_process(request, response);
  }else if(pathname === "/author"){
    author.page(request, response);
  }else if(pathname === "/author_create"){
    author.author_create(request, response);
  }else if(pathname === "/author_create_process"){
    author.author_create_process(request, response);
  }else if(pathname === "/author_update"){
    author.author_update(request, response);
  }else if(pathname === "/author_update_process"){
    author.author_update_process(request, response);
  }else if(pathname === "/delete_process"){
    author.author_delete_process(request, response);
  }else{

  }
});
app.listen(3000);
