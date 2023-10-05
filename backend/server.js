const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const sql = require("mssql");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
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

async function hashPassword(password) {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
}

//POST register
app.post("/mssql/register", async function (req, res) {
  const { email, password } = req.body;
  try {
    const hashedPassword = await hashPassword(password);

    //connect to database to save user with hash password
    const request = db.request();
    const query =
      "insert into users(email, password) values(@email, @password)";
    request
      .input("email", sql.NVarChar, email)
      .input("password", sql.VarChar, hashedPassword);

    //results
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
  const { email, password } = req.body;

  if (!email || !password) {
    throw new Error("Please enter valid email and password");
  }

  try {
    await sql.connect(config);
    const result =
      await sql.query`SELECT email, password FROM users WHERE email = ${email}`;

    const user = result.recordset[0];
    if (!user || !(await correctPassword(password, user.password))) {
      throw new Error("Incorrect email or password");
    }
    if (result.recordset.length > 0) {
      res.status(200).json({ message: "Login successful" });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  } finally {
    sql.close();
  }

  /* 
  try {
    const result = await db.query(query);
    if (result.recordsets.length === 1) {
      const user = result.recordsets[0];
      const match = await bycrpt.compare(password, user.password);

      if (match) {
        const token = jwt.sign({ email: user.email }, process.env.SECRET_KEY, {
          expiresIn: "1h",
        });
        res.json({ success: true, token: token });
      } else {
        res.status(401).json({ success: false, status: "Invalid Credentials" });
      }
    } else {
      res.status(401).json({ success: false, status: "User not Found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  } */
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

async function correctPassword(candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
}
// start the server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
