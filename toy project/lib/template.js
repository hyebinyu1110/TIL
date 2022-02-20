
//   module.exports = template;

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
        list = list + `<li><a href="/?id=${topics[i].id}">${topics[i].title}</a></li>`;
        i = i + 1;
      }
      list = list + '</ul>';
      return list;
    },

    authorSelect: function(authors){
      var tag = '';
      var i = 0;
      while(i < authors.length){
        tag += `<option value="${authors[i].id}">${authors[i].name}</option>`;
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
        table += '<tr><td>id</td><td>name</td><td>profile</td><td>edit</td></tr>';
        while (i < authors.length) {
            table += `<tr><td>${authors[i].id}</td><td>${authors[i].name}</td><td>${authors[i].profile}</td>
            <td><a href="/author_update?id=${authors[i].id}">update</a> 
            <form action="delete_process" method="post">
            <input type="hidden" name="id" value="${authors[i].id}">
            <input type="submit" value="delete">
            </form> </td>   </tr>    
            `            
            ;
            i++;
        }
        table += '</table>';
        return table;
    }
    
    };
    
  
  
  
