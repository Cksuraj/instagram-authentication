const mongoose = require("mongoose");                    // database requires mongoose 

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/mydatabase';   // database url to store data using dotenv envirment

const database = () => {                   // Basic Database Connections functions
  mongoose
    .connect(MONGO_URL)
    .then((conn) => {
      console.log(`Connctions of DB :${conn.connection.host}`);
    })
    .catch((err) => console.log(err.message));
};

module.exports=database;
 

