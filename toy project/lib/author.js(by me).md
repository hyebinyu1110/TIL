~~~Java Script
var db = require('./db.js');
var template = require('./template.js');
var topic = require('./topic.js');
var qs = require('querystring');
var url = require('url');

exports.home = function (request, response) {

    db.query(`SELECT * FROM author`, function (error, authors) {
        if (error) throw error;

        var title = ``;
        var description = `this is author page`;
        var table = template.table(authors);
        var HTML = template.HTML(title, table,
            `
        <p><a href="/author/create">CREATE</a></p>
        `,
            description);
        response.writeHead(200);
        response.end(HTML);
    });
}

exports.create = function (request, response) {

    db.query(`SELECT * FROM author`, function (error, authors) {
        if (error) throw error;

        var table = template.table(authors);
        var HTML = template.HTML(``, table,
            `
        <form action="/author/create_process" method="post">
        <p><input type="text" name="name" placeholder="name" /></p>
        <p><textarea name="profile" placeholder="profile"></textarea></p>
        <input type="submit" value="submit" />
        </form>
        `,
            ``);
        response.writeHead(200);
        response.end(HTML);
    })
}


exports.create_process = function (request, response) {
    var body = '';
    request.on('data', function (data) {
        body += data;
    });
    request.on('end', function () {
        var post = qs.parse(body);
db.query(`SELECT * FROM author`, function(error, authors){
    if(error) throw error;
        db.query(`INSERT INTO author (id, name, profile) VALUES("${authors.length+1}","${post.name}", "${post.profile}")`,
            function (error1, result) {
                if (error1) throw error1;
                response.writeHead(302, { Location: `/author` });
                response.end('');
            });
        });
    });
}

exports.update = function (request, response) {

    var body = '';
    request.on('data', function (data) {
        body += data;
    })
    request.on('end', function () {
        var post = qs.parse(body);
        db.query(`SELECT * FROM author`, function (error, authors) {
            if (error) throw error;
            db.query(`SELECT * FROM author WHERE id=${post.id}`, function (error1, author) {
                if (error1) throw error1;

                var table = template.table(authors);
                var HTML = template.HTML(``, table,
                    `
            <form action="/author/update_process" method="post">
            <p><input type="hidden" name="id" value="${post.id}"></p>
            <p><input type="text"  name="name" value="${author[0].name}"></p>
            <p><textarea name="profile">${author[0].profile}</textarea></p>
            <p><input type="submit" value="update"></p>
            </form>
    
            `,
                    `
            `);
                response.writeHead(200);
                response.end(HTML);
            })
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
    db.query(`UPDATE author SET name=?, profile=? WHERE id=?`, 
    [post.name, post.profile, post.id], 
    function(error, result){
        if(error) throw error;

        response.writeHead(302, {Location: `/author`});
        response.end(''); 
    });
});
}

exports.delete_process = function(request, response){
    var body = '';
    request.on('data', function(data){
        body += data;
    })
    request.on('end', function(){
        var post = qs.parse(body);
        db.query(`DELETE FROM topic WHERE author_id=?`, [post.id], function(error, result){
            if(error) throw error;
        db.query(`DELETE FROM author WHERE id=?`, [post.id], function(error1, result){
            if(error1) throw error1;
            response.writeHead(302, {Location: `/author`});
            response.end('');
        });
    });
});
}
~~~
