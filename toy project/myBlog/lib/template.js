
//   module.exports = template;

module.exports = {

    HTML: function(title, list, body, control) {
      return `
      <!doctype html>
      <html>
      <head>
      <title>sanitizeDIAMOND(💎);</title>
     <meta charset="utf-8">
     <style>
     a {
       decoration: none;
     }

     div{
       float: left;
     }

    
     </style>
     </head>
     <body>
     <h1><a href="/">sanitizeDIAMOND(💎);</a></h1>
     <br/>
     <h3>"자신의 일지를 리뷰함으로써 당신은 미래를 만들어 내기 위해 과거와 현재를 재배치할 수 있다."<br/><h6>- 프로그래머의 길, 멘토에게 묻다. p.213</h6></h3>
     
     <h4><어제, 오늘, 내일을 찾을 수 있는 위키></h4>
    ${list}
    ${control}
    <h3>${title}</h3>
     ${body}
      </body>
     </html>
    `
    },
  
    list: function (filelist) {
      var list = '<ul>';
      var i = 0;
      while (i < filelist.length) {
        list = list + `<li><a href="/?id=${filelist[i].id}">${filelist[i].title}</a></li>`;
        i = i + 1;
      }
      list = list + '</ul>';
      return list;
    }
  
    
  }
  
  
