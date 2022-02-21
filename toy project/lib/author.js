var db = require('./db.js');
var template = require('./template.js');
var qs = require('querystring');
var url = require('url'); // 모듈 url
var sanitizeHTML = require('sanitize-html'); 
exports.home = function (request,response) {
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
    db.query(`SELECT * FROM author`, function (error, authors) {
        var table = template.table(authors);
        var title = '';
        var description = "this is author page"
        var HTML = template.HTML(title, table,
            `<h2>${title}</h2>${description}`,
            `<a href="/author/create">create</a>`);
        response.writeHead(200); // 파일을 성공적으로 전송
        response.end(HTML);
    });

}

exports.create = function (request, response) {
    db.query(`SELECT * FROM author`, function (error, authors) {
            var title = 'Create';
            var table = template.table(authors);
            var HTML = template.HTML(sanitizeHTML(title), table,
                `
               <form action="/author/create_process" method="post">
               <p><input type="hidden" name="id" value=${authors.length+1}></p>
               <p><input type="text" name="name" placeholder="name"></p>
               <p><input type="text" name="profile" placeholder="profile"></p>
               <p>
               <input type="submit" value="submit">
               </p>
               </form>
               `,
                `<a href="/author/create">create</a>`);
                response.writeHead(200); // 파일을 성공적으로 전송
                response.end(HTML);
        });
}

exports.create_process = function (request, response) {
    var body = '';
    request.on('data', function (data) {

      body = body + data;
    });

    request.on('end', function () {
      var post = qs.parse(body);
    
        db.query(
          `INSERT INTO author (id, name, profile)
           VALUES(?, ?, ?)`,
           [post.id, post.name, post.profile], 
      function(error, result){
        if(error){
          throw error;
        }
        response.writeHead(302, {Location: "/author"});
        response.end('');
      }
      )
    });
}

exports.update = function(request, response){
  var _url = request.url;
  var queryData = url.parse(_url, true).query;

  db.query(`SELECT * FROM author`, function (error, authors) {
      if (error) {
        throw error;
      }
      db.query(`SELECT * FROM author WHERE id=?`, [queryData.id], function (error2, author) {
        // 사용자가 입력한 값은 신용하면 안되기 때문에 id=?로 해놓고 두번째 인자에 id값을 넣음 그래서 ?로 두번째 인자가 치환됨. 두번째인자가 공격의 여지가 있는 것을 알아서 세탁해줌.
        if (error2) {
          throw error2;
        };
     
        
        title ="Update";
        var table = template.table(authors);
        var HTML = template.HTML(title, table,
          `
        <form action="/author/update_process" method="post">
        <input type="hidden" name="id" value="${author[0].id}">
        <p><input type="text" name="name" value="${sanitizeHTML(author[0].name)}"></p>     
        <p><input type="text" name="profile" value="${sanitizeHTML(author[0].profile)}"></p>
        <p>
        <input type="submit">
        </p>
        </form>
        `,
          `<a href="/author/create">create</a> <a href="/author/update?id=${queryData.id}">update</a>`);
        response.writeHead(200); // 파일을 성공적으로 전송
        response.end(HTML);
      });
    });
  }


  exports.update_process = function(request, response){
    var body = '';
    request.on('data', function (data) {
      body = body + data;
    });

    request.on('end', function () {
      var post = qs.parse(body);
      console.log(post);
      db.query(
        `UPDATE author SET name=?, profile=? WHERE id=?`, [post.name, post.profile, post.id], function (error, result) {
          if (error) {
            throw error;
          }
          response.writeHead(302, { Location: `/author` });
          response.end('');
        })
    });
}


exports.delete_process = function(request, response){
  var body = '';
  request.on('data', function (data) {
    body = body + data;
  });
  request.on('end', function () {
    var post = qs.parse(body);
    console.log(post);
    db.query(`DELETE FROM topic WHERE author_id=?`,
                [post.id], 
                function(error1, result){
                 if(error1){
                     console.log(error1);
                     throw error1;
                   }
                db.query(`DELETE FROM author WHERE id = ?`, 
                [post.id], 
                function (error2, result) {
                    if (error2) {
                        throw error2;
                    }
                        response.writeHead(302, { Location: `/author` });  // 302는 redirection  을 의미
                        response.end();
                    });
                 });
             });
         }
