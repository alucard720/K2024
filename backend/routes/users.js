const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("Users");
const Degree = mongoose.model("Degree");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const verifyToken = require("../Middleware/verifyToken");
//
require("dotenv").config();
//

router.post("/register", (req, res) => {
  console.log("sent by client - ", req.body);
  const { name, email, password, phone } = req.body;
  if (!name || !email || !password || !phone) {
    return res.status(422).send({ error: "Invalid Credentials" });
  }
  User.findOne({ email: email }).then(async (savedUser) => {
    if (savedUser) {
      res.status(422).send({ message: "Usuario ya existe" });
    }
    const user = new User({
      name,
      email,
      password,
      phone,
    });
    try {
      await user.save();
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
      res.send({ message: "Usuario registrado", token });
      console.log(token);
    } catch (err) {
      console.log(err);
    }
  });
});

router.post("/verify", (req, res) => {
  console.log("sent by client - ", req.body);
  const { name, email, password, phone } = req.body;
  if (!name || !email || !password || !phone) {
    return res.status(422).json({ error: "Please add all the fields" });
  }

  User.findOne({ email: email }).then(async (savedUser) => {
    if (savedUser) {
      return res.status(422).json({ error: "Invalid Credentials" });
    }
    try {
      let VerificationCode = Math.floor(100000 + Math.random() * 900000);
      let user = [
        {
          name,
          email,
          password,
          phone,
        },
      ];
      await mailer(email, VerificationCode);
      res.send({
        message: "Verification Code Sent to your Email",
        udata: user,
      });
    } catch (err) {
      console.log(err);
    }
  });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(422)
      .json({ error: "Por favor Ingrese Correo y Contrasena" });
  }
  const savedUser = await User.findOne({ email: email });

  if (!savedUser) {
    return res.status(422).json({ error: "Invalid Credentials" });
  }
  try {
    bcrypt.compare(password, savedUser.password, (err, result) => {
      if (result) {
        console.log("Exito");
        //authenticar el usuario
        const token = jwt.sign(
          { _id: savedUser._id, name: savedUser.name },
          process.env.JWT_SECRET
        );
        res.send({ token });
        console.log(token);
      } else {
        return;
      }
    });
  } catch (err) {
    console.log(err);
  }
});

router.get("/Users", async (req, res) => {
  const Users = await User.find();
  if (User.length > 0) {
    res.send(Users);
  } else {
    res.send({ result: " no user found" });
  }
  //
});

//ruta protegida del Profile

router.get("/Profile", verifyToken, async (req, res) => {
  const email = req.user.email;

  const profileData = await User.find();
  if (User.length > 0) {
    res.send(profileData);
  } else {
    res.send({ result: "no se encontro usuario" });
  }
});

module.exports = router;
