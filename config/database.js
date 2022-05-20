const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "hello887",
  database: "expressDB",
});

db.connect();

module.exports = db;


