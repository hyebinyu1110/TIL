const express = require('express');
const router = express.Router();
var template = require('../lib/template.js');
var auth = require('../lib/auth.js');

router.get('/', function(request, response){ // 경로로 사용자가 들어왔을때 호출될 콜백함수
 // deserializeUser의 done 함수의  authData에 request.user 라고 하는 객체로 전달되도록 약속되어 있다. passport 사용하지 않으면 , request 객체는 user라고 하는 객체를 가지고 있지 않음. 
  var fmsg = request.flash();
  var feedback = '';
  if(fmsg.success){
    feedback = fmsg.success[0];
  }
  var title = 'Welcome';
  var description = `Hello, user`;
    var list = template.list(request.list);
    var html = template.HTML(title, list,
      `
      <div style="color:blue">${feedback}</div>
      <h2>${title}</h2>${description}
      <img src="/images/hello.jpg" style="display: block; width:300px; margin-top:10px;">
      `,
      `<a href="/topic/create">create</a>`,
      auth.statusUI(request, response)
    );
    response.send(html);

});

module.exports = router;
