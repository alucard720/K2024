const sql = require("mssql");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class User {
  async register(username, password) {
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);

    const request = new sql.Request();
    const query = ` INSERT INTO users(username, password) VALUES(@username, @password)`;
    request.input("username", sql.NVarChar, username);
    request.input("password", sql.NVarChar, hash);
    try {
      await request.query(query);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
  async login(username, password) {
    const request = new sql.Request();
    const query =
      "SELECT id, username, password FROM users WHERE username = @username";

    request.input("username", sql.NVarChar, username);

    const result = await request.query(query);

    if (result.recordset.length === 1) {
      const user = result.recordset[0];
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        const token = jwt.sign(
          { id: user.id, username: user.username },

          { expiresIn: "1h" }
        );
        return token;
      }
    }

    return null;
  }
}

module.exports = User;
