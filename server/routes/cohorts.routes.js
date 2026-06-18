const express = require("express");
const router = express.Router();

// IMPORT MODEL
const Cohort = require("../models/Cohorts.model");

function errorFunction() {
  return Promise.reject("Promise rejected");
}

router.get("/", async (req, res, next) => {
  // returns all cohorts from the database.
  try {
    const response = await Cohort.find();
    res.json(response);
  } catch (error) {
    next(error);
  }
});

router.get("/:cohortId", async (req, res, next) => {
  // returns a specific cohort using its id.
  try {
    const response = await Cohort.findById(req.params.cohortId);
    res.json(response);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  // creates a new cohort document.
  const {
    cohortSlug,
    cohortName,
    program,
    format,
    campus,
    startDate,
    endDate,
    inProgress,
    programManager,
    leadTeacher,
    totalHours,
  } = req.body;
  try {
    const newCohort = {
      cohortSlug,
      cohortName,
      program,
      format,
      campus,
      startDate,
      endDate,
      inProgress,
      programManager,
      leadTeacher,
      totalHours,
    };
    const response = await Cohort.create(newCohort);
    res.json(response);
  } catch (error) {
    next(error);
  }
});

router.put("/:cohortId", async (req, res, next) => {
  // updates a cohort
  const {
    cohortSlug,
    cohortName,
    program,
    format,
    campus,
    startDate,
    endDate,
    inProgress,
    programManager,
    leadTeacher,
    totalHours,
  } = req.body;
  try {
    const updatedCohort = {
      cohortSlug,
      cohortName,
      program,
      format,
      campus,
      startDate,
      endDate,
      inProgress,
      programManager,
      leadTeacher,
      totalHours,
    };
    const response = await Cohort.findByIdAndUpdate(
      req.params.cohortId,
      updatedCohort,
      { returnDocument: "after", runValidators: true },
    );
    res.json(response);
  } catch (error) {
    next(error);
  }
});

router.delete("/:cohortId", async (req, res, next) => {
  // removes a cohort from the database.
  try {
    await Cohort.findByIdAndDelete(req.params.cohortId);
    res.json({ msg: "Deleted successfully" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
