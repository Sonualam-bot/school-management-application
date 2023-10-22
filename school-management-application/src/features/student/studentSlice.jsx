import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  students: [
    {
      id: 1,
      name: "Tomy Egan",
      age: 25,
      grade: "A",
      studentClass: "12",
      gender: "Male",
      attendance: 50,
      marks: 50,
    },
    {
      id: 2,
      name: "Jane Doe",
      age: 26,
      grade: "A",
      studentClass: "10",
      gender: "Male",
      attendance: 100,
      marks: 100,
    },
    {
      id: 3,
      name: "Monkey D. Luffy",
      age: 24,
      grade: "A",
      studentClass: "12",
      gender: "Female",
      attendance: 75,
      marks: 80,
    },
    {
      id: 4,
      name: "Ichigo Kurosaki",
      age: 23,
      grade: "A",
      studentClass: "10",
      gender: "Female",
      attendance: 75,
      marks: 80,
    },
  ],
  studentDetails: {
    name: "",
    age: "",
    grade: "",
    studentClass: "",
    gender: {
      male: "",
      female: "",
    },
    attendance: "",
    marks: "",
  },
  sortBy: "",
};

const studentReducer = createSlice({
  name: "student",
  initialState,
  reducers: {
    addStudent: (state, action) => ({
      ...state,
      students: [...state.students, action.payload],
    }),
    deleteStudent: (state, action) => ({
      ...state,
      students: state.students.filter(
        (student) => student.id !== action.payload
      ),
    }),
    editStudent: (state, action) => {
      const updatedData = action.payload;
      const newStudentData = state.students.map((student) => {
        if (student.id === updatedData.id) {
          return updatedData;
        }
        return student;
      });
      return { ...state, students: newStudentData };
    },
    studentInput: (state, action) => ({
      ...state,
      studentDetails: action.payload,
    }),
    sortByGender: (state, action) => ({
      ...state,
      sortBy: action.payload,
    }),
  },
});

export const {
  addStudent,
  deleteStudent,
  studentInput,
  editStudent,
  sortByGender,
} = studentReducer.actions;

export default studentReducer.reducer;
