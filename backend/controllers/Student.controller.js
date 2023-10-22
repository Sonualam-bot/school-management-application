const Student = require("../models/Student.model");

async function createNewStudent(studentData) {
  try {
    const newStudent = await Student.create(studentData);
    return newStudent;
  } catch (error) {
    throw new Error(`${error}`);
  }
}

async function deleteStudentData(id) {
  try {
    const deleteStudent = await Student.findByIdAndDelete({ _id: id });
    return deleteStudent;
  } catch (error) {
    throw new Error(`${error}`);
  }
}

async function editStudentData(id, updateData) {
  try {
    const findStudent = await Student.findByIdAndUpdate(
      { _id: id },
      updateData,
      { new: true }
    );
    return findStudent;
  } catch (error) {
    throw new Error(`${error.message}`);
  }
}

async function getAllStudents() {
  try {
    const allStudents = await Student.find({});
    return allStudents;
  } catch (error) {
    throw new Error(`${error.message}`);
  }
}

module.exports = {
  createNewStudent,
  deleteStudentData,
  editStudentData,
  getAllStudents,
};
