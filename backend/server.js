const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const controller = require("./controllers/userController");
const verifyToken = require("./middleware/verifyToken");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

//routes
app.get("/users", controller.getAllUsers);
app.post("/register", controller.createNewuser);
app.post("/login", controller.login); 




// start the server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
