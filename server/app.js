process.loadEnvFile(); // IMPORT ENV FILE

const express = require("express");
const PORT = process.env.PORT || 5005;

// INITIALIZE EXPRESS APP
const app = express();

// DB
require('./db')

// MIDDLEWARES
const config = require('./config')
config(app)

// TEST AND DOCS ROUTES
app.get("/", (req, res) => {
  res.json({ msg: "Everything ok" });
}); 
app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

// API ROUTES
const router = require("./routes/index.routes")
app.use("/",router)

// USER ROUTES


// MIDDLEWARES HANDLING ERROR
const {errorHandler, notFoundHandler} = require("./middleware/error-handling.js")

app.use(notFoundHandler)
app.use(errorHandler)


// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

