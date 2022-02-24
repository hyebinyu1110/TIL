~~~ Java Script
var db = require('./db.js');
var template = require('./template.js');
var url = require('url'); // 모듈 url
var qs = require('querystring');
var sanitizeHTML = require('sanitize-html');

exports.home = function (request, response) {
  db.query(`SELECT * FROM topic`, function (error, topics) {

    if (error) {
      throw error;
    }
    var title = 'welcome!';
    var description = `It's hyebin's website`;
    var list = template.list(topics);
    var HTML = template.HTML(title, list,
      `<p><a href='/create'>create</a></p>`,
      description);
    response.writeHead(200);
    response.end(HTML);

  });
}

exports.page = function (request, response) {

  var _url = request.url;
  var queryData = url.parse(_url, true).query;

  db.query(`SELECT * FROM topic`, function (error, topics) {

    if (error) {
      throw error;
    }

    db.query(`SELECT * FROM topic WHERE id=?`, [queryData.id], function (error2, topic) {
      var title = 'welcome!';
      var list = template.list(topics);
      var HTML = template.HTML(title, list,
        `
    <p><a href='/create'>create</a>  <a href="/update">update</p>
    <h2>${topic[0].title}</h2>
    `,
        topic[0].description);
      response.writeHead(200);
      response.end(HTML);
    });
  });
}

exports.create = function (request, response) {

  var _url = request.url;
  var queryData = url.parse(_url, true).query;

  db.query(`SELECT * FROM topic`, function (error, topics) {
    if (error) {
      throw error;
    }

    var title = 'welcome!';
    var list = template.list(topics);
    var HTML = template.HTML(title, list,
      `
    <p><a href='/create'>create</a>  <a href="/update">update</p>
    `,
      `
    <form action="/create_process" method="post">
    <p><input type="text" name="title" placeholder="title"  />
    <p> <textarea name="description" placeholder="description"></textarea></p>
    <input type="submit" value="submit" />
    </form>
    `
    );
    response.writeHead(200);
    response.end(HTML);

  });
}

exports.create_process = function (request, response) {
  db.query(`SELECT * FROM topic`, function(error1, topics){
if (error1) {
throw error1;
}
  var body = '';
  request.on('data', function (data) {
    body += data;
  })
  request.on('end', function () {
    var post = qs.parse(body);
    db.query(
      `INSERT INTO topic (title, description, created, author_id)
       VALUES(?, ?, NOW(), 1)`,
       [post.title, post.description, post.author], 
       function(error, result){
    if(error){
      throw error;
    }
    response.writeHead(302, {Location: `/?id=${result.insertId}`});
    response.end('');
  })
})
  })
}
~~~
