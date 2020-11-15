// import
// server
const express = require("express");
const app = express();
// db
// const mysql = require('mysql2');
// const db_setting = {
//  host: process.env.DB_HOST || 'localhost',
//  port: process.env.DB_PORT || 3306,
//  user: process.env.DB_USER || 'root',
//  password: process.env.DB_PASSWORD ||'manager',
//  database: process.env.DB_DATABASE ||'management'
// };
// const db = mysql.createConnection(db_setting);

const apiVer = "v1";

// db.connect();
// db.query('SELECT * from users LIMIT 10;', (err, rows, fields) => {
//     if (err) throw err;
  
//     console.log('The solution is: ', rows);
// });
// db.end();



const port = process.env.PORT || 3000;

app.listen(port);

console.log("Listen on port http://localhost:" + port);
