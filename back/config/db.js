const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'peyton',
  password: 'notpey',
  database: 'movie_app',
  port: 8889
});

db.connect(err => {
  if (err) throw err;
  console.log('MySQL connected...');
});

module.exports = db;