const sql = require("mssql");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
dotenv.config();

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

//Get all users
const getAllUsers = async (req, res) => {
  const request = db.request();
  const result = await request.query("SELECT * FROM dbo.PRUEBA01");
  res.json({ msg: "Fetch user success", data: result.recordsets });
};

async function hashPassword(password) {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
}

//POST register

async function hashPassword(password) {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
}

//POST de crear el usuario
const createNewuser = async (req, res) => {
  const { email, password } = req.body;

  //confirm data
  if (!email || !password) {
    return res.status(401).json({ message: "Todos los campos son requeridos" });
  }

  if (await checkDuplicateUser(email)) {
    return res.status(403).json({ message: true, msg: "usuario duplicado" });
  }

  //funcion para crear el usuario
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

  //usuario duplicado
};
//POST login

const login = async (req, res) => {
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

    if (match) {
      const token = jwt.sign({ email: user.email }, process.env.SECRET_KEY, {
        expiresIn: "1h",
      });
      res.json({ success: true, token: token });
    } else {
      res.status(401).json({ success: false, status: "Invalid Credentials" });
    }
  } 
    catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
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
};

//authentication controller
const match = async function correctPassword(candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
}

//duplicate user
const checkDuplicateUser = async (email) => {
  try {
    await sql.connect(config);
    const result =
      await sql.query`SELECT 1 AS count FROM users WHERE email = ${email}`;

    if (result.recordset[0].count > 0) {
      // User already exists
      return true;
    } else {
      // User does not exist
      return false;
    }
  } catch (err) {
    console.error(err);
    throw new Error("Error while checking for duplicate user");
  }
};

module.exports = { createNewuser, login, getAllUsers };
