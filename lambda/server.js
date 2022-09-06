import mongoose from "mongoose";
require("dotenv").config();
// Initialize connection to database
const dbUrl = process.env.REACT_APP_DB,
  dbOptions = {
    useNewUrlParser: true,
  };
// Set DB from mongoose connection
mongoose.connect(dbUrl, dbOptions);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
export default db;
