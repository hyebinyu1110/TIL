
var http = require('http');
var url = require('url'); // 모듈 url
var topic = require('./lib/topic.js');
var db = require('mysql');


var app = http.createServer(function (request, response) {
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  var pathname = url.parse(_url, true).pathname;

  if (pathname === "/") {
    if (queryData.id === undefined) {
      topic.home(request, response);
     
    } else {
      // fs.readdir('./data', function (error, filelist) {
      //   var filteredId = path.parse(queryData.id).base;
      //   fs.readFile(`data/${filteredId}`, 'utf8', function (err, description) {
      //     var title = queryData.id;
      //     var sanitizedTitle = sanitizeHtml(title);
      //     var sanitizedDescription = sanitizeHtml(description, {

      //       allowedTags: ['h1']
      //     }
      //       ); 
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
  }else if (pathname === "/delete_process") {
    topic.delete_process(request, response);
  }else {
    response.writeHead(404);
    response.end('Not Found');

  }

});
app.listen(4000);

