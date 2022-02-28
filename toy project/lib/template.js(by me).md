~~~Java Script
//   module.exports = template;
const { MACCE_BIN } = require('mysql/lib/protocol/constants/charsets');
var sanitizeHTML = require('sanitize-html'); // 사용자가 작성가능한 곳을 sanitizeHTML을 사용하여 오염 방지
module.exports = {

  HTML: function(title, list,control, description) {
    return `
    <!doctype html>
    <html>
    <head>
    <title>Dot Connector -  Welcome!</title>
   <meta charset="utf-8">
   </head>
   <body>
   <h1><a href="/">Dot Connector - Log</a></h1>
   <a href="/author">author</a>
  <p> 
  ${list}
  </p>
  ${control}
  ${title}
  ${description}
   </body>
   </html>
  `
  },

  list: function (topics) {
    var list = '<ul>';
    var i = 0;
    while (i < topics.length) {
      list = list + `<li><a href="/?id=${topics[i].id}">${sanitizeHTML(topics[i].title)}</a></li>`;
      i = i + 1;
    }
    list = list + '</ul>';
    return list;
  },

  authorSelect: function(authors){
    var tag = '';
    var i = 0;
    while(i < authors.length){
      tag += `<option value="${authors[i].id}">${sanitizeHTML(authors[i].name)}</option>`;
      i++;
    }
    return tag;
    
  },

  table: function(authors){

    var table = `<table border=1  style="border-collapse:collapse">`;
    var i = 0;
    table += `<tr><td>id</td><td>name</td><td>profile</td><td>edit</td></tr>`;
    while(i < authors.length){
      table += `<tr><td>${authors[i].id}</td><td>${authors[i].name}</td><td>${authors[i].profile}</td><td>
      <form action="/author/update" method="post">
      <input type="hidden" name="id" value="${authors[i].id}" />
      <input type="submit" value="update" />
      </form>
      <form action="/author/delete_process" method="post">
      <input type="hidden" name="id" value="${authors[i].id}" />
      <input type="submit" value="delete" />
      </form>
      </td>
      </tr>`;
      i += 1;
    }
    table += `</table>`;
    return table;
    }
  }
~~~
