process.loadEnvFile();

const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 5005;
const CLIENT_PORT = process.env.CLIENT_PORT || 5173;

// IMPORT MODELS
const Cohort = require("./models/Cohorts.model");
const Student = require("./models/Students.model");

// INITIALIZE EXPRESS APP
const app = express();

// CONNECTION TO THE DB
const mongo_uri = "mongodb://127.0.0.1:27017/cohort-tools-api";

mongoose
  .connect(mongo_uri)
  .then((res) =>
    console.log(`Connected to the database: ${res.connections[0].name}`),
  )
  .catch((error) => console.log(`Connection error: ${error}`));

// MIDDLEWARE
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cors({
    origin: [`http://localhost:${CLIENT_PORT}`], // Add the URLs of allowed origins to this array
  }),
);

// ROUTES
app.get("/", (req, res) => {
  res.json({ msg: "Everything ok" });
});

app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

// COHORTS

app.get("/api/cohorts", async (req, res) => {
  try {
    const response = await Cohort.find();
    res.json(response);
  } catch (error) {
    res.json(error);
  }
});

app.get("/api/cohorts/:cohortId", async (req, res) => {
  try {
    const response = await Cohort.findById(req.params.cohortId);
    res.json(response);
  } catch (error) {
    res.json(error);
  }
});

app.post("/api/cohorts", async (req, res) => {
  try {
    const response = await Cohort.create(req.body);
    res.json(response);
  } catch (error) {
    res.json(error);
  }
});

app.put("/api/cohorts/:cohortId", async (req, res) => {
  try {
    const response = await Cohort.findByIdAndUpdate(
      req.params.cohortId,
      req.body,
      { returnDocument: "after", runValidators: true },
    );
    res.json(response);
  } catch (error) {
    res.json(error);
  }
});

app.delete("/api/cohorts/:cohortId", async (req, res) => {
  try {
    await Cohort.findByIdAndDelete(req.params.cohortId);
    res.json({ msg: "Deleted successfully" });
  } catch (error) {
    res.json(error);
  }
});

// STUDENTS

app.get("/api/students", async (req, res) => {
  try {
    const response = await Student.find().populate("cohort");
    res.json(response);
  } catch (error) {
    res.json(error);
  }
});

app.get("/api/students/cohort/:cohortId", async (req, res) => {
  try {
    const response = await Student.find({
      cohort: req.params.cohortId,
    }).populate("cohort");
    res.json(response);
  } catch (error) {
    res.json(error);
  }
});

app.get("/api/students/:studentId", async (req, res) => {
  try {
    const response = await Student.findById(req.params.studentId).populate(
      "cohort",
    );
    res.json(response);
  } catch (error) {
    res.json(error);
  }
});

app.post("/api/students", async (req, res) => {
  try {
    const response = await Student.create(req.body);
    res.json(response);
  } catch (error) {
    res.json(error);
  }
});

app.put("/api/students/:studentId", async (req, res) => {
  try {
    const response = await Student.findByIdAndUpdate(
      req.params.studentId,
      req.body,
      { returnDocument: "after", runValidators: true },
    );
    res.json(response);
  } catch (error) {
    res.json(error);
  }
});

app.delete("/api/students/:studentId", async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.studentId);
    res.json({ msg: "Deleted successfully" });
  } catch (error) {
    res.json(error);
  }
});

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
