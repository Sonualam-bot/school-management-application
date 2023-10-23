const express = require("express");
const studentRouter = express.Router();

const {
  createNewStudent,
  deleteStudentData,
  editStudentData,
  getAllStudents,
} = require("../controllers/Student.controller");

studentRouter.get("/student/all", async (req, res) => {
  try {
    const students = await getAllStudents();

    res.status(200).json({
      success: true,
      message: "Successfully fetched data from the db",
      student: students,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch students. Routes not matched",
    });
  }
});

studentRouter.post("/student/new", async (req, res) => {
  try {
    const { name, age, grade, studentClass, gender, attendance, marks } =
      req.body;

    if (
      !name ||
      !age ||
      !grade ||
      !studentClass ||
      !gender ||
      !attendance ||
      !marks
    ) {
      res.status(401).json({
        success: false,
        message: "Required Fields cannot be empty",
      });
    } else {
      const addStudent = await createNewStudent(req.body);

      res.status(200).json({
        success: true,
        message: "Successfully created a new student",
        student: addStudent,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Failed to create new Student Entry ${error.message}`,
    });
  }
});

studentRouter.delete("/student/delete/:studentID", async (req, res) => {
  try {
    const studentID = req.params.studentID;

    const findStudentAndDelete = await deleteStudentData(studentID);
    console.log(findStudentAndDelete);

    if (!findStudentAndDelete) {
      res.status(401).json({
        success: false,
        message: `Failed to find student by id`,
      });
    }

    res.status(200).json({
      success: true,
      message: "Successfully deleted student by ID",
      student: findStudentAndDelete,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Failed to delete student data ${error.message} `,
    });
  }
});

studentRouter.post("/student/edit/:studentID", async (req, res) => {
  try {
    const studentID = req.params.studentID;
    const studentToBeEdited = await editStudentData(studentID, req.body);

    if (!studentToBeEdited) {
      res.status(401).json({
        success: false,
        message: "Student not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Successfully updated student Data",
      student: studentToBeEdited,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Failed to edit student ${error.message}`,
    });
  }
});

module.exports = studentRouter;
