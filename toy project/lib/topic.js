var db = require('./db.js');
var template = require('./template.js');
var url = require('url'); // 모듈 url
var qs = require('querystring');


exports.home = function(request, response){

db.query(`SELECT * FROM topic`, function(error, topics){
    var title = 'welcome';
    var description = 'Hello, node.js'
    var list = template.list(topics);
    var HTML = template.HTML(title, list,
     `<h2>${title}</h2>${description}`,
     `<a href="/create">create</a>`);
    response.writeHead(200); // 파일을 성공적으로 전송
    response.end(HTML);
  });

} 

exports.page = function(request, response){
    var _url = request.url;
  var queryData = url.parse(_url, true).query;
    db.query(`SELECT * FROM topic`, function(error, topics){
        if(error){
          throw error;        
        }
        db.query(`SELECT * FROM topic LEFT JOIN author ON topic.author_id = author.id WHERE topic.id=? `, [queryData.id], function(error2, topic){
          // 사용자가 입력한 값은 신용하면 안되기 때문에 id=?로 해놓고 두번째 인자에 id값을 넣음 그래서 ?로 두번째 인자가 치환됨. 두번째인자가 공격의 여지가 있는 것을 알아서 세탁해줌.
          if(error2){
            throw error2;        
          }
        console.log(topic);
        var title = topic[0].title;
        var description = topic[0].description;
        var list = template.list(topics);
        var HTML = template.HTML(title, list,
         `<h2>${title}</h2>${description}
           <p> by ${topic[0].name }<p>`,
         `<a href="/create">create</a>
                <a href="/update?id=${queryData.id}">update</a>
               <form action="delete_process" method="post">
               <input type="hidden" name="id" value="${queryData.id}">
               <input type="submit" value="delete">
               </form>`
         );
         response.writeHead(200); // 파일을 성공적으로 전송
         response.end(HTML);
        });
       });
    }

       exports.create = function(request, response){
        db.query(`SELECT * FROM topic`, function(error, topics){
            db.query(`SELECT * FROM author`, function(error2, authors){
              var title = 'Create';
              var tag = '';
              var i = 0;
              while(i < authors.length){
                tag += `<option value="${authors[i].id}">${authors[i].name}</option>`;
                i++;
              }
      
              var list = template.list(topics);
              var HTML = template.HTML(title, list,
               `
               <form action="/create_process" method="post">
               <p><input type="text" name="title" placeholder="title"></p>
               <p>
               <textarea name="description" id="" cols="30" rows="10" placeholder="description"></textarea>
               </p>
               <p>
               <select name="author">
               ${tag}
               </select>
               </p>
               <p>
               <input type="submit">
               </p>
               </form>
               `,
               `<a href="/create">create</a>`);
              response.writeHead(200); // 파일을 성공적으로 전송
              response.end(HTML);
            });
            });

        }
    
        exports.create_process = function(request, response){

            var body = '';
            request.on('data', function (data) {
        
              body = body + data;
            });
        
            request.on('end', function () {
        
              var post = qs.parse(body);
                db.query(
                  `INSERT INTO topic (title, description, created, author_id)
                   VALUES(?, ?, NOW(), ?)`,
                   [post.title, post.description, post.author], 
                   function(error, result){
                if(error){
                  throw error;
                }
                response.writeHead(302, {Location: `/?id=${result.insertId}`});
                response.end('');
              }
              )
            });
        }

        exports.update = function(request, response){
            var _url = request.url;
            var queryData = url.parse(_url, true).query;

            db.query(`SELECT * FROM topic`, function (error, topics) {
                if (error) {
                  throw error;
                }
                db.query(`SELECT * FROM topic WHERE id=?`, [queryData.id], function (error2, topic) {
                  // 사용자가 입력한 값은 신용하면 안되기 때문에 id=?로 해놓고 두번째 인자에 id값을 넣음 그래서 ?로 두번째 인자가 치환됨. 두번째인자가 공격의 여지가 있는 것을 알아서 세탁해줌.
                  if (error2) {
                    throw error2;
                  }
          
                  var list = template.list(topics);
                  var HTML = template.HTML(topic[0].title, list,
                    `
                  <form action="/update_process" method="post">
                  <input type="hidden" name="id" value="${topic[0].id}">
                  <p><input type="text" name="title" value="${topic[0].title}"></p>     
                  <p>
                  <textarea name="description" placeholder="description">${topic[0].description}</textarea>
                  </p>
                  <p>
                  <input type="submit">
                  </p>
                  </form>
                  `,
                    `<a href="/create">create</a> <a href="/update?id=${topic[0].id}">update</a>`);
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
                  db.query(
                    `UPDATE topic SET title=?, description=?, author_id=1 WHERE id=?`, [post.title, post.description, post.id], function (error, result) {
                      if (error) {
                        throw error;
                      }
                      response.writeHead(302, { Location: `/?id=${post.id}` });
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
                  db.query(`DELETE FROM topic WHERE id = ?`, [post.id], function (error, result) {
                    if (error) {
                      throw error;
                    }
                    response.writeHead(302, { Location: `/` });  // 302는 redirection  을 의미
                    response.end();
                  })
                });

        }