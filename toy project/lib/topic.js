//   module.exports = template;
var sanitizeHTML = require('sanitize-html'); // 사용자가 작성가능한 곳을 sanitizeHTML을 사용하여 오염 방지
module.exports = {

  HTML: function(title, list, body, control) {
    return `
    <!doctype html>
    <html>
    <head>
    <title>WEB2 - ${title}</title>
   <meta charset="utf-8">
   </head>
   <body>
   <h1><a href="/">WEB2</a></h1>
   <a href="/author">author</a>
  <p> 
  ${list}
  </p>
  ${control}
  ${body}
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
    return `
    <p>
    ${template.authorSelect(authors)} 
    </p>
    `
  },

  table: function(authors){
    
      var i = 0;
      var table = '<table border=1 style="border-collapse:collapse">';
      table += '<tr><td>id</td><td>name</td><td>profile</td><td colspan=2>edit</td></tr>';
      while (i < authors.length) {
          table += `<tr><td>${authors[i].id}</td><td>${sanitizeHTML(authors[i].name)}</td><td>${sanitizeHTML(authors[i].profile)}</td>
          <td><a href="/author/update?id=${authors[i].id}">update</a> </td>
          <td><form action="/author/delete_process" method="post">
          <input type="hidden" name="id" value="${authors[i].id}">
          <input type="submit" value="delete">
          </form> </td></tr>    
          `            
          ;
          i++;
      }
      table += '</table>';
      return table;
  }
  
  };
  

