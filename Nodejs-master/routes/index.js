const express = require('express');
const router = express.Router();
var template = require('../lib/template.js');


router.get('/', function(request, response){ // 경로로 사용자가 들어왔을때 호출될 콜백함수
 
    var title = 'Welcome';
    var description = 'Hello, Node.js';
    var list = template.list(request.list);
    var html = template.HTML(title, list,
      `
      <h2>${title}</h2>${description}
      <img src="/images/hello.jpg" style="display: block; width:300px; margin-top:10px;">
      `,
      `<a href="/topic/create">create</a>`
    );
    response.send(html);

});

module.exports = router;
