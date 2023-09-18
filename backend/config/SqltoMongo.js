const mysql = require("mysql2/promise");
const { MongoClient } = require("mongodb");

async function main() {
  // Connect to the SQL database
  const sqlConnection = await mysql.createConnection({
    host: "your-sql-host",
    user: "your-sql-username",
    password: "your-sql-password",
    database: "your-sql-database",
  });

  // Fetch data from the SQL table
  const [rows] = await sqlConnection.execute("SELECT * FROM your_sql_table");

  // Connect to the MongoDB database
  const mongoClient = new MongoClient(
    "mongodb+srv://ingsantana36:nwrKRCWOeEBK2jkT@cluster0.dzjkdna.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
    }
  );

  try {
    await mongoClient.connect();

    const db = mongoClient.db("your-mongodb-database");
    const collection = db.collection("your-mongodb-collection");

    // Insert data into MongoDB collection
    const insertResult = await collection.insertMany(rows);

    console.log(
      `${insertResult.insertedCount} documents inserted into MongoDB.`
    );
  } finally {
    // Close the database connections
    await sqlConnection.end();
    await mongoClient.close();
  }
}

main().catch((err) => console.error("Error:", err));
