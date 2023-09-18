/**
 * This file includes all the fields for a user.
 * For storing photos directly on mongodb: https://medium.com/@alvenw/how-to-store-images-to-mongodb-with-node-js-fb3905c37e6d
 * For storing photos directly on database with Multer: https://www.settletom.com/blog/uploading-images-to-mongodb-with-multer
 */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const candidatoSchema = new Schema(
  {
    Nombres: {
      type: String,
      trim: true,
      required: true,
      maxlength: [20, "User name too long"],
      //minlength: [3, "Fist name too short"]
    },
    Apellidos: {
      type: String,
      trim: true,
      required: true,
      maxlength: [20, "First name too long"],
      //minlength: [3, "Fist name too short"]
    },
    Cedula: {
      type: String,
      trim: true,
      required: true,
      maxlength: [20, "Last name too long"],
      //minlength: [3, "Last name too short"]
    },
    Municipio: {
      type: String,
      required: true,
      //maxlength: [20, "Password too long"],
      //minlength: [6, "Password too short"]
    },
    Provincia: {
      type: String,
      required: true,
      maxlength: [30, "Email exceed the maximum length"],
      //minlength: [6, "Email invalid"]
    },
    Sexo: {
      type: String,
      maxlength: [14, "Phone number too long"],
      //minlength: [10, "Phone number invalid"]
    },
  },
  { timestamps: true }
);

// virtual fields goes here

// compile and export model from mongoose.Schema
const User = mongoose.model("Candidato", candidatoSchema);
module.exports = User;
