var fs = require('fs')
var http = require('http');
var url = require('url');
var qs = require('querystring');

// Create a local server to receive data from

function templateHtml(title, list, description, control) {
  return `
  <!doctype html>
  <html>
  <head>
  <title>Doc Connector</title>
 <meta charset="utf-8">
 </head>
 <body>
 <h1><a href="/">Doc Connector</a></h1>
 <h3>어제, 오늘, 내일을 찾을 수 있는 위키</h3>
  <h5>"자신의 일지를 리뷰함으로써 당신은 미래를 만들어 내기 위해 과거와 현재를 재배치할 수 있다. -프로그래머의 길, 멘토에게 묻다 p.213-"</h5>
  ${control}
  <h3>-----updated list-----</h3>
<h4>${list}</h4>
${title}
${description}
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

var server = http.createServer((request, response) => {

  var _url = request.url; // 프롬프트에 출력해보면 <ref *1>IncomingMessage 객체에 url 키 가 있다. 서버로 들어온 url 웹주소 전체를 받음('/' 포함)
  var queryData = url.parse(_url, true).query;

  //url 모듈로 _url 구문분석하여 객체로 만듬 , 객체 내 에 query 속성이 있음.
  // / true이면 id? 다음에 오는 foo=bar&abc=xyz&abc=123%27를 객체로 반환
  // 2번째 인자인 true가 없으면 객체가 안되고, string 으로만 나옴
  var pathname = url.parse(_url, true).pathname;


  if (pathname === '/') { // localhost:4000만 쳐도 프롬프트에 pathname은 '/'로 나옴
    if (queryData.id === undefined) {
      fs.readdir("./data", function(error, filelist){
        var title = ``;
        var description = ``;
        var list = templateList(filelist);
        var HTML = templateHtml(title, list,description,
          `<h3><a href="/create">create</a></h3>`
          );
        response.writeHead(200); // 파일을 성공적으로 전송
        response.end(HTML);
      });
    }else{
      fs.readdir('./data', function(error, filelist){
        fs.readFile(`./data/${queryData.id}`, 'utf8', function(error, description){
        var title = queryData.id;
        var description = description;
        var list = templateList(filelist);
        var HTML = templateHtml(title, list,description,
          `<h3><a href="/create">create</a> <a href="/update">update</a></h3>`
          );
        response.writeHead(200); // 파일을 성공적으로 전송
        response.end(HTML);
        })
      })
    }
  }else if(pathname === '/create'){

    fs.readdir('./data', function(error, filelist){
      var title = '';

      var list = templateList(filelist);
      var HTML = templateHtml(title, list,
        `
        <form action="/create_process" method="post">
        <p><input type="text" name="title" placeholder="title" value=""></p>
         <p>
        <textarea name="description" id="" cols="30" rows="10" placeholder="description"></textarea>
        </p>
       <p>
        <input type="submit">
      </p>
        `,
        ``);
      
        response.writeHead(200); // 파일을 성공적으로 전송
        response.end(HTML);

    })
  }else if(pathname === "/create_process"){
    var body ='';
    request.on('data', function(data){
      body = body + data;
    })
    request.on('end', function(){ 
    var post = qs.parse(body);
    var title = post.title;
    var description = post.description;

    fs.writeFile(`./data/${title}`, description, function(err){
      response.writeHead(302, { 'Location' : `/?id=${title}`});
      response.end('');
    });
    });

  }else if(pathname === "/update"){
    console.log(request);
    console.log(_url);
    console.log(url.parse(_url, true));
    fs.readdir('./data', function(error, filelist){
      fs.readFile(`./data/${queryData.id}`, function(){

        var title = '';
        var description ='';
        var list = templateList(filelist);
        var HTML = templateHtml(title, list,
          `
          <form action="/update_process" method="post">
          <p><input type="hidden" name="id"></p>
          <p><input type="text" name="title"</p>
          <p><input type="submit" value="submit">
          </form>
          `,
          `
          `)
  
      })

   

    })









  }else if(pathname === "update_process"){}





});


server.listen(4000);