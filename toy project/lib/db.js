var mysql = require('mysql');

var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'hby6362488',
    database: 'dotconnector'
  });
  
  db.connect();

  module.exports = db;