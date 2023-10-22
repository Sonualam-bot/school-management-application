const express = require("express");
const teacherRouter = express.Router();

const {
  createNewTeacher,
  deleteTeacher,
  editTeacher,
  getAllTeacherData,
} = require("../controllers/Teacher.controller");

teacherRouter.get("/teacher/all", async (req, res) => {
  try {
    const teacher = await getAllTeacherData();

    res.status(200).json({
      success: true,
      message: "Successfully fetched data",
      teacher: teacher,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch data .Routes not matched ",
    });
  }
});

teacherRouter.post("/teacher/new", async (req, res) => {
  try {
    const { name, subject, contactInfo } = req.body;
    if (!name || !subject || !contactInfo) {
      res.status(401).json({
        success: true,
        message: "Required fields missing",
      });
    } else {
      const newTeacherData = await createNewTeacher(req.body);
      res.status(200).json({
        success: true,
        message: "Successfully added a new teacher",
        teacher: newTeacherData,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Failed to add new Teacher ${error.message}`,
    });
  }
});

teacherRouter.delete("/teacher/delete/:teacherID", async (req, res) => {
  try {
    const teacherID = req.params.teacherID;
    const removeTeacher = await deleteTeacher(teacherID);

    if (!removeTeacher) {
      res.status(401).json({
        success: false,
        message: "Failed to find teacher by the specified id",
      });
    }

    res.status(200).json({
      success: true,
      message: `Successfully deleted Teacher`,
      teacher: removeTeacher,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Failed to delete teacher ${error.message} `,
    });
  }
});

teacherRouter.post("/teacher/edit/:teacherID", async (req, res) => {
  try {
    const teacherID = req.params.teacherID;
    const editTeacherById = await editTeacher(teacherID, req.body);

    if (!editTeacherById) {
      res.status(401).json({
        success: false,
        message: "Failed to find teacher by specified id",
      });
    }

    res.status(200).json({
      success: true,
      message: "Successfully updated teacher by id",
      teacher: editTeacherById,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Faild to edit teacher ${error.message}`,
    });
  }
});

module.exports = teacherRouter;
