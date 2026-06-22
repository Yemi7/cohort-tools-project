const mongoose = require("mongoose"); // connect Express to MongoDB

const mongo_uri = "mongodb://127.0.0.1:27017/cohort-tools-api";

mongoose
  .connect(mongo_uri)
  .then((res) =>
    console.log(`Connected to the database: ${res.connections[0].name}`),
  )
  .catch((error) => console.log(`Connection error: ${error}`));
