//   module.exports = template;

module.exports = {

    HTML: function(title, list, body, control) {
      return `
      <!doctype html>
      <html>
      <head>
      <title>sanitizeDIAMOND(๐);</title>
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
     <h1><a href="/">sanitizeDIAMOND(๐);</a></h1>
     <br/>

     <form action="/search_process" method="GET">
     <input type="text" name="title" placeholder="title์ ์๋ ฅํ์ธ์." />
     <input type="submit" value="search" />
     </form>
  

     <br/>
     <h3>"์์ ์ ์ผ์ง๋ฅผ ๋ฆฌ๋ทฐํจ์ผ๋ก์จ ๋น์ ์ ๋ฏธ๋๋ฅผ ๋ง๋ค์ด ๋ด๊ธฐ ์ํด ๊ณผ๊ฑฐ์ ํ์ฌ๋ฅผ ์ฌ๋ฐฐ์นํ  ์ ์๋ค."<br/><h6>- ํ๋ก๊ทธ๋๋จธ์ ๊ธธ, ๋ฉํ ์๊ฒ ๋ฌป๋ค. p.213</h6></h3>
     
     <h4><์ด์ , ์ค๋, ๋ด์ผ์ ์ฐพ์ ์ ์๋ ์ํค></h4>
     ${control}
     ${list}
  
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
  
  
