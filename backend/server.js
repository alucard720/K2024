const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bycrpt = require("bcryptjs");
const sql = require("mssql");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

//start sql_server
const config = {
  user: process.env.SQL_USER,
  password: process.env.SQL_USER_PASSWORD,
  server: process.env.SQL_USER_SERVER,
  database: process.env.SQL_DATABASE,
  pool: {
    max: 5,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    trustedConnection: false,
    trustServerCertificate: false,
    encrypt: false,
    enableArithAbort: true,
  },
};
const db = sql.connect(config, function (err) {
  if (err) throw err;
  console.log("Server connection established");
});
//get all users
app.get("/mssql/users", async function (req, res) {
  const request = db.request();
  const result = await request.query("SELECT * FROM dbo.PRUEBA01");
  res.json({ msg: "Fetch user success", data: result.recordsets });
});

//POST register
app.post("/mssql/register", async function (req, res) {
  const { username, password } = req.body;
  const request = db.request();
  const hashedpassword = await bycrpt.hash(password, 10);

  const query =
    "insert into users(username, password) values(@username, @password)";
  request
    .input("username", sql.NVarChar(50), username)
    .input("password", sql.NVarChar(50), password.hashedpassword);
  try {
    const result = await request.query(query);
    console.log(result);
    res.json({ success: true, msg: "Save User Data successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Registration failed" });
  }
});

//POST login

app.post("/mssql/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: false, message: "username and password requeridos" });
  }

  try {
    const request = db.request();

    const query =
      "SELECT username, password FROM users WHERE username = @username ";

    request.input("username", sql.NVarChar(50), username);
    /* .input("password", sql.NVarChar(50), password); */

    const result = await request.query(query);
    if (result.recordsets.length === 1) {
      const user = result.recordsets[0];

      console.log(user);

      if (user.password === password) {
        res.status(200).json({ message: "login successful" });
      }

      /* const match = await bycrpt.compare(password, user.password); */

      /*   if (match) {
        res.json({ message: true, message: "Login succesful" });
      } else {
        res.json({ message: false, message: "Login failed" });
      } */
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Login failed" });
  }
});

//POST UPDATE user

app.put("/mssql/update/:id", async (req, res) => {
  const request = db.request();

  request.input("username", sql.NVarChar, req.body.username);
  request.input("password", sql.NVarChar, req.body.password);

  await request.query(
    "update users set username=@username, password=@password"
  );
  res.json({ msg: "success update user" });
});
//POST delete user

app.post("/mssql/delete:id", async (req, res) => {
  const request = db.request();

  request.input("id", sql.int, req.params.id);

  await request.query("delete * from users id=@id");
  res.json({ msg: "Delete User Data successfully" });
});
// start the server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
