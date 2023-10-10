const sql = require("mssql");


  const config = {
    user: process.env.SQL_AZURE_USER,
    password: process.env.SQL_AZURE_PASS,
    server: process.env.SQL_AZURE_SERVER,
    database: process.env.SQL_AZURE_DATA,
    options: {
     encrypt:true,
     trustServerCertificate:false,
    },
  };

 let pool;
 

async function connectToDatagase(){
  try {
    pool= await sql.connect(config)
    console.log('Connect to Azure SQL Server')
  } catch (error) {
    console.error('Error connnecting to the database', error)
  }
}

module.exports={
  connectToDatagase, pool
}





