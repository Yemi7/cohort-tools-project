process.loadEnvFile();

const express = require("express")
const cookieParser = require("cookie-parser"); // reads cookies from requests
const morgan = require("morgan"); // logs requests in the terminal
const cors = require("cors"); // allow React frontend

function config (app){
    app.use(express.json());
    app.use(morgan("dev")); // Logs incoming requests
    app.use(express.static("public")); // Serves static files from the public folder.
    app.use(express.urlencoded({ extended: false })); // allows the server to read from data
    app.use(cookieParser()); // reads cookies from requests
    app.use(
      cors({
        origin: [process.env.ORIGIN], // Add the URLs of allowed origins to this array
      }),
    );
    
}

module.exports = config