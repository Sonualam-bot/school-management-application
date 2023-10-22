const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    grade: {
      type: String,
      enum: ["A+", "A", "B", "C", "D", "E", "F"],
      required: true,
    },
    studentClass: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Trans"],
    },
    attendance: {
      type: Number,
      required: true,
    },
    marks: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
