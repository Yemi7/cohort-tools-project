const express = require("express")
const router = express.Router()

// IMPORT MODEL
const Cohort = require("../models/Cohorts.model")

router.get("/", async (req, res, next) => {
  // returns all cohorts from the database.
  console.log(req.query)
  try {
    const response = await Cohort.find(req.query)
    res.json(response)
  } catch (error) {
    next(error)
  }
})

router.get("/:cohortId", async (req, res, next) => {
  // returns a specific cohort using its id.
  try {
    const response = await Cohort.findById(req.params.cohortId)

    if (!response) {
      res.status(400).json({ message: "Cohort not found." })
      return
    }

    res.json(response)
  } catch (error) {
    next(error)
  }
})

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
  } = req.body

  if (!cohortSlug || !cohortName) {
    res.status(400).json({ message: "Cohort slug and name are required." })
    return
  }

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
    }
    const response = await Cohort.create(newCohort)
    res.json(response)
  } catch (error) {
    next(error)
  }
})

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
  } = req.body

  if (!cohortSlug || !cohortName) {
    res.status(400).json({ message: "Cohort slug and name are required." })
    return
  }

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
    }

    if (Object.values(updatedCohort).includes(undefined)) {
      res.status(400).json({ message: "Missing information." })
      return
    }

    const response = await Cohort.findByIdAndUpdate(
      req.params.cohortId,
      updatedCohort,
      { returnDocument: "after", runValidators: true },
    )

    if (!response) {
      res.status(400).json({ message: "Cohort not found." })
      return
    }

    res.json(response)
  } catch (error) {
    next(error)
  }
})

router.delete("/:cohortId", async (req, res, next) => {
  // removes a cohort from the database.
  try {
    const response = await Cohort.findByIdAndDelete(req.params.cohortId)

    if (!response) {
      res.status(400).json({ message: "Cohort not found." })
      return
    }

    res.json({ message: "Deleted successfully" })
  } catch (error) {
    next(error)
  }
})

module.exports = router
