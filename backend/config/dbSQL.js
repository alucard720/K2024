const sql = require("mssql");

const dbConn = () => {
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
  sql.connect(config, function (err) {
    if (err) throw err;
  });
};

module.exports = dbConn;
