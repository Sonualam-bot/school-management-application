const { findByIdAndUpdate } = require("../models/Student.model");
const Teacher = require("../models/Teacher.model");

async function createNewTeacher(teacherData) {
  try {
    const newTeacher = await Teacher.create({
      name: teacherData.name,
      subject: teacherData.subject,
      contactInfo: teacherData.contactInfo,
    });
    return newTeacher;
  } catch (error) {
    console.error("Error creating new teacher:", error);
    throw new Error(`${error.message}`);
  }
}

async function deleteTeacher(id) {
  try {
    const deleteTeacherWithID = await Teacher.findByIdAndDelete({ _id: id });
    return deleteTeacherWithID;
  } catch (error) {
    throw new Error(`${error.message}`);
  }
}

async function editTeacher(id, updateData) {
  try {
    const teacher = await Teacher.findByIdAndUpdate({ _id: id }, updateData, {
      new: true,
    });
    return teacher;
  } catch (error) {
    throw new Error(`${error.message}`);
  }
}

async function getAllTeacherData() {
  try {
    const allTeacher = await Teacher.find({});
    return allTeacher;
  } catch (error) {
    throw new Error(`${error.message}`);
  }
}

module.exports = {
  createNewTeacher,
  deleteTeacher,
  editTeacher,
  getAllTeacherData,
};
