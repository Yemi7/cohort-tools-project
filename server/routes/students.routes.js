const express = require("express")
const router = express.Router()

// IMPORT MODEL
const Student = require("../models/Students.model")
const Cohort = require("../models/Cohorts.model")

router.get("/", async (req, res, next) => {
  // returns all students.
  try {
    const response = await Student.find(req.params).populate("cohort") // The student document only stores the cohort ObjectId. Populate replaces that ObjectId with the actual Cohort document.
    res.json(response)
  } catch (error) {
    next(error)
  }
})

router.get("/cohort/:cohortId", async (req, res, next) => {
  // returns all students belonging to be a specific cohort.
  try {
    const response = await Student.find({
      cohort: req.params.cohortId, // Find students whose cohort field matches the cohortId.
    }).populate("cohort")

    // if statement to differentiate between an invalid cohort id, and a cohort with no students
    if (!response.length) {
      const response = await Cohort.findById(req.params.cohortId)
      if (!response) {
        res.status(400).json({ message: "Cohort not found. " })
        return
      }
    }

    res.json(response)
  } catch (error) {
    next(error)
  }
})

router.get("/:studentId", async (req, res, next) => {
  // Returns a single student.
  try {
    const response = await Student.findById(req.params.studentId).populate(
      "cohort",
    )

    if (!response) {
      res.status(400).json({ message: "Students not found. " })
      return
    }

    res.json(response)
  } catch (error) {
    next(error)
  }
})

router.post("/", async (req, res, next) => {
  // Creates a new student document.
  const {
    firstName,
    lastName,
    email,
    phone,
    linkedinUrl,
    languages,
    program,
    background,
    image,
    cohort,
    projects,
  } = req.body

  if (!firstName || !lastName || !email || !phone) {
    res
      .status(400)
      .json({ message: "First, last name, email and phone are required." })
    return
  }

  try {
    const newStudent = {
      firstName,
      lastName,
      email,
      phone,
      linkedinUrl,
      languages,
      program,
      background,
      image,
      cohort,
      projects,
    }
    const response = await Student.create(newStudent)
    res.json(response)
  } catch (error) {
    next(error)
  }
})

router.put("/:studentId", async (req, res, next) => {
  // Updates an existing studnet document.
  const {
    firstName,
    lastName,
    email,
    phone,
    linkedinUrl,
    languages,
    program,
    background,
    image,
    cohort,
    projects,
  } = req.body

  if (!firstName || !lastName || !email || !phone) {
    res
      .status(400)
      .json({ message: "First, last name, email and phone are required." })
    return
  }

  try {
    const updatedStudent = {
      firstName,
      lastName,
      email,
      phone,
      linkedinUrl,
      languages,
      program,
      background,
      image,
      cohort,
      projects,
    }

    if (Object.values(updatedStudent).includes(undefined)) {
      res.status(400).json({ message: "Missing information." })
      return
    }

    const response = await Student.findByIdAndUpdate(
      req.params.studentId,
      updatedStudent,
      { returnDocument: "after", runValidators: true },
    )

    if (!response) {
      res.status(400).json({ message: "Students not found. " })
      return
    }

    res.json(response)
  } catch (error) {
    next(error)
  }
})

router.delete("/:studentId", async (req, res, next) => {
  // Deletes a student from the database.
  try {
    const response = await Student.findByIdAndDelete(req.params.studentId)

    if (!response) {
      res.status(400).json({ message: "Students not found. " })
      return
    }

    res.json({ message: "Deleted successfully" })
  } catch (error) {
    next(error)
  }
})

module.exports = router
