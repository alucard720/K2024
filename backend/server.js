const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const sql = require("mssql");
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

//POST login
app.post("/mssql/register", async function (req, res) {
  const request = db.request();
  request
    .input("username", sql.NVarChar(50), req.body.username)
    .input("password", sql.NVarChar(50), req.body.password);

  const q =
    "insert into users(username, password) values(@username, @password)";

  const result = await request.query(q);
  console.log(result);
  res.json({ msg: "Save User Data successfully" });
});
// start the server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
