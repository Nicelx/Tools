// #region express starter
const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/get-info", conrollerFun);

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
// #endregion 


// #region express controller example
app.post("/create-user", async (req, res) => {
  User.create({
    username: req.body.username,
    password: req.body.password,
  });

  res.send({ message: "some message, success for example" });
});
// #endregion
 
// #region DB(mysql)


// #region mysql db.js example
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host:'localhost',
  user: 'root',
  password: 'pwd',
  database: 'database_name',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;
// #endregion

// #region execute example
    const username = 'John';
    const password = 'some_pwd';

    const [result] = await pool.execute(
      "INSERT INTO users (username,  password) VALUES (?, ?)",
      [username, password]
    );
// #endregion

// #region query example

const [rows] = await pool.query("SELECT id, username FROM users");

// #endregion


// #endregion


