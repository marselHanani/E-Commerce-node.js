const mongoose = require("mongoose");
const DbConnection = () => {
  mongoose
    .connect(process.env.DB_URL).then((connection) => {
      console.log(`Connected to database : ${connection.connection.host}`);
    })
     .catch((error) => {
      console.log(`Error connecting to database : ${error}`);
      process.exit(1);
    }); 
};

module.exports = DbConnection;
