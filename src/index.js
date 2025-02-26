require('dotenv').config({path: 'src/.env'});
// Add Express
const express = require("express");
// Initialize Express
const app = express();
const mysql = require('mysql2');
const userRoute = require('./routes/user.route');
const config = {
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE_NAME,
  port: process.env.DATABASE_PORT,
  ssl: {
    rejectUnauthorized: false,
    ca: process.env.CA,
  },
};
// Create GET request
app.get("/", (req, res) => {
  var data = '';
  const conn = mysql.createConnection(config);
  conn.execute('SELECT VERSION() AS version', [], (err, result) => {
      if (err) throw err;
      data = result[0].version;
      conn.end();
      res.status(400).json({
      status: "success",
      message: data,
      })
  });
});

app.use('/user', userRoute);

// Initialize server
app.listen(5000, () => {
  console.log("Running on port 5000.");
});

module.exports = app;