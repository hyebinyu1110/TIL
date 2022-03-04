var db = require('./db.js');
var template = require('./template.js');
var url = require('url');
var qs = require('querystring');
var moment = require('moment'); // Importing the Moment.js module
const { blob } = require('stream/consumers');
var mydate = moment().format("YYYY-MM-DD(day)"); // Using moment.format() with the given format, it converts the date


exports.home = function (request, response) {

    db.query(`SELECT * FROM topic ORDER BY id DESC`, function (error, topics) {

        if (error) throw error;

        var title = ``;
        var description = ``;
        var control = `
        <p>
        <form action="/create" method="post">
        <input type="submit" value="create">
        </form>
        </p>
        `
        var list = template.list(topics);
        var HTML = template.HTML(title, list, description,
            control);

        response.writeHead(200);
        response.end(HTML);
    });

}

exports.page = function (request, response) {

    var _url = request.url;
    var queryData = url.parse(_url, true).query;

    db.query(`SELECT * FROM topic ORDER BY id DESC`, function (error, topics) {

        if (error) throw error;

        db.query(`SELECT * FROM topic WHERE id=?`
            , [queryData.id]
            , function (error1, topic) {
                if (error1) throw error1;
                var id = topic[0].id;
                var title = topic[0].title;
                var description = `<pre>${topic[0].description}</pre>`;
               
                var HTML = template.HTML(title, ``, description,
             
                    `
                <a href="/create">create</a>
                <a href="/update?id=${id}">update</a>
                <form action="/delete_process" method="post">
                <input type="hidden" name="id" value="${id}" />
                <input type="submit" value="delete" />
                </form>
            `);
                response.writeHead(200);
                response.end(HTML);
            })
    })

}

exports.create = function (request, response) {

    db.query(`SELECT * FROM topic ORDER BY id DESC`, function (error, topics) {

        if (error) throw error;

        var title = ``;
        var description = ``;
        var control =
            `
        <form action="/create_process" method="post">
        <p><input type="text" name="title" placeholder="YYYY-MM-DD" value="${mydate}"></p>
        <p><textarea name="description" rows="20" cols="100" placeholder="description"></textarea></p>
        <select name="author_id">
        <option value="1">hyebinyu1110</option>
        </select>
        <p>
        <input type="submit" value="create">
        </p>
        </form>
        `
        var HTML = template.HTML(title, ``, description,
            control);

        response.writeHead(200);
        response.end(HTML);
    });
}


exports.create_process = function (request, response) {


    var body = '';
    request.on('data', function (data) {

        body += data;
    })

    request.on('end', function () {

        var post = qs.parse(body);

        db.query(`SELECT * FROM topic ORDER BY id DESC`, function (error, topics) {
             // err가 있을 경우, err를 처리하는 법을 제공함, 우리는 신경쓰지 않을 것임
//         // 콜백이 실행이 된다는 것은, 파일의 저장이 끝났다는 것이다. 
//         // 파일의 저장이 끝난 다음, success코드가 있어야 하니 아래 실행
//         response.writeHead(302, { Location: `/?id=${title}` }); // 파일을 성공적으로 전송
//         response.end('');
            if(error) throw error;
            db.query(`INSERT INTO topic (id, title, description, created, author_id) VALUES(?,?,?,NOW(),?)`,
                [topics.length + 1, post.title, post.description, post.author_id ],
                function(error1, result){
                    response.writeHead(302, {Location: `/`});
                    response.end('');
                }
            );
        });
    });

}

exports.update = function(request, response){

    var _url = request.url;
    var queryData = url.parse(_url, true).query;

    db.query(`SELECT * FROM topic ORDER BY id DESC`, function(error, topics){

        if(error) throw error;
        db.query(`SELECT * FROM topic WHERE id=?`, [queryData.id], function(error1, topic){

            if(error1) throw error1;

            var list = template.list(topics);
            var HTML = template.HTML(``, ``, 
            `
            <form action="/update_process" method="post">
            <input type="hidden" name="id" value="${topic[0].id}">
            <p><input type="text" name="title" value="${topic[0].title}"></p>
            <p><textarea name="description"  rows="20" cols="100">${topic[0].description}</textarea></p>
            <select name="author_id">
            <option value="1">hyebinyu1110</option>
            </select>
            <p>
            <input type="submit" value="update">
            </p>
            </form>
            `, 
            `
            <a href="/create">create</a>
            <a href="/update?id=${topic[0].id}">update</a>
            <form action="/delete_process" method="post">
            <input type="hidden" name="id" value="${topic[0].id}" />
            <input type="submit" value="delete" />
            </form>
            
            `);

            response.writeHead(200);
            response.end(HTML);
        })
    })
}

exports.update_process = function(request, response){

var body = '';

request.on('data', function(data){

    body += data;
})

request.on('end', function(){

    var post = qs.parse(body);
    console.log(post);

    db.query(`UPDATE topic SET title=?, description=?, author_id=? WHERE id=?`,
    [post.title, post.description, post.author_id, post.id],
    function(error, result){
        if(error) throw error;
        response.writeHead(302, {Location: `/?id=${post.id}`}); // 302는 redirection  을 의미
        response.end('');
    })
})
}

exports.delete_process = function(request, response){

var body = '';

request.on('data', function(data){

    body += data;
})

request.on('end', function(){

    var post = qs.parse(body);

    db.query(`DELETE FROM topic WHERE id=?`, 
    [post.id], 
    function(error, result){
        if(error) throw error;
        response.writeHead(302, { Location: `/`});
        response.end('');
    })
})
}


exports.search_process = function(request, response){
    
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
   
    console.log(queryData);
        db.query(`SELECT * FROM topic WHERE title LIKE ?`, `%`+queryData.title+`%`, function(error, result){
            if(error) throw error;

            console.log(result);

            if(result[0] = null){
            var title = `result`;
            var HTML = template.HTML(title, ``,
            `
           ${template.list(result)}
         
            `,
            ``);
        }else{

            var title = `result`
            var description = `sorry, couldn't find the content you wanted.`;
            var HTML = template.HTML(title, ``,description, ``);
        }
            response.writeHead(200);
            response.end(HTML);
        })

}
