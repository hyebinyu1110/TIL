~~~ Java Script
var db = require('./db.js');
var template = require('./template.js');
var url = require('url');
var qs = require('querystring');

exports.home = function (request, response) {
  db.query(`SELECT * FROM topic`, function (error, topics) {
    if (error) throw error;
    var title = '<h2>welcome!</h2>';
    var description = `Hello there,`;
    var list = template.list(topics);
    var HTML = template.HTML(title, list,
      `
     <p> <a href="/create">create</a></p>
      `
      , description);
    response.writeHead(200);
    response.end(HTML);

  })
}

exports.page = function (request, response) {
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  db.query(`SELECT * FROM topic`, function (error, topics) {
    if (error) throw error;
    db.query(`SELECT * FROM topic LEFT JOIN author ON topic.author_id=author.id WHERE topic.id=?`, [queryData.id], function (error2, topic) {
  
      var title = `<h2>${topic[0].title}</h2>`;
      var list = template.list(topics);
      var HTML = template.HTML(title, list,
        `
        <p> <a href="/create">CREATE</a>   <a href="/update?id=${queryData.id}">UPDATE</a> <form action="/delete_process" method="post">
        <input type="hidden" name="id" value="${queryData.id}">
        <input type="submit" value="delete" />
        </form>
        </p>

        `,
        `${topic[0].description} <h4>by ${topic[0].name}</h4>`
      );
      response.writeHead(200);
      response.end(HTML);
    })
  })
}



exports.create = function (request, response) {

  db.query(`SELECT * FROM topic`, function (error, topics) {
    if(error) throw error;
    db.query(`SELECT * FROM author`, function(error1, authors){
      if(error1) throw error1;
    var title = ``;
    var description = ``;

    var list = template.list(topics);
    var HTML = template.HTML(title, list,
      `
    <a href="/create">create</a> 
      `,
      `
      <form action="/create_process" method="post">
      <p><input type="text" placeholder="title" name="title" /></<p>
      <p> <textarea name="description" placeholder="description"></textarea></<p>
      <p>
      <select name="author_id">
      ${template.authorSelect(authors)}
      </select>
      </p>
      <p><input type="submit" value="submit" /></p>
      </form>
      `);

    response.writeHead(200);
    response.end(HTML);

  });
  });
}



exports.create_process = function (request, response) {
  var body = '';
  request.on('data', function (data) {
    body += data;
  })
  request.on('end', function () {
    var post = qs.parse(body);

    db.query(`SELECT * FROM topic`, function(error, topics){
      if(error) throw error;
    db.query(`INSERT INTO topic (id, title, description, created, author_id) VALUES('${topics.length+1}', '${post.title}', '${post.description}', NOW(), ${post.author_id})`,
    
      function (error1, result) {
        if (error1) throw error1;
        response.writeHead(302, { Location: `/?id=${result.insertId}` });
        response.end('');
      })
  })
})
}

exports.update = function (request, response) {

  var _url = request.url;
  var queryData = url.parse(_url, true).query;

  db.query(`SELECT * FROM topic`, function (error, topics) {
    if (error) throw error;
    db.query(`SELECT * FROM topic WHERE id=${queryData.id}`, function (error1, topic) {
      if(error1) throw error1;
      db.query(`SELECT * FROM author`, function(error2, authors){
      if (error2) throw error2;
      var list = template.list(topics);
      var HTML = template.HTML(``, list,
        `
      <p><a href="/create">create</a>  <a href="/?id=${queryData.id}
      <form action="/delete_process" method="post">
        <input type="hidden" name="id" value="${queryData.id}">
        <input type="submit" value="delete" />
        </form>
      </p>
      `
      ,`
      <form action="/update_process" method="post">
      <input type="hidden" name="id" value="${topic[0].id}" />
      <p><input type="text" name="title" value="${topic[0].title}" /></p>
      <p><textarea name="description">${topic[0].description}</textarea></p>
      <p>
      <select name="author_id">
      ${template.authorSelect(authors)}
      </select>
      </p>
      <input type="submit" value="submit" />
      </form>
      `);

      response.writeHead(200);
      response.end(HTML);
    });
  });
});
}

exports.update_process = function(request, response){

  var body = '';
  request.on('data', function(data){

    body += data;
  })

  request.on('end', function(){

    var post = qs.parse(body);
    console.log(post);
    db.query(`UPDATE topic SET title="${post.title}", description="${post.description}", author_id="${post.author_id}" WHERE id="${post.id}" `, function(error, result){

      if(error) throw error;

      response.writeHead(302, { Location:`/?id=${post.id}` });
      response.end('');

    });

  });

}

exports.delete_process = function(request, response){

  var body ='';
  request.on('data', function(data){

    body += data;
  })

  request.on('end', function(){
    var post = qs.parse(body);
    console.log(post);
    db.query(`DELETE FROM topic WHERE id="${post.id}"`, function(error, result){
      if(error) throw error;
      response.writeHead(302, { Location: `/`});
      response.end('');
    });
  })
}
~~~ 
