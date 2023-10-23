import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  teachers: [
    {
      id: 1,
      name: "Walter White",
      subject: "Chemistry",
      contactInfo: "teacher1@email.com",
    },
    {
      id: 2,
      name: "Jessy Pinkman",
      subject: "Science",
      contactInfo: "teacher2@email.com",
    },
    {
      id: 3,
      name: "Saul Goodman",
      subject: "Law",
      contactInfo: "teacher3@email.com",
    },
  ],
  teacherDetails: {
    id: "",
    name: "",
    subject: "",
    contactInfo: "",
  },
};

const teacherSlice = createSlice({
  name: "teacher",
  initialState,
  reducers: {
    addTeacher: (state, action) => ({
      ...state,
      teachers: [...state.teachers, action.payload],
    }),
    deleteTeacher: (state, action) => ({
      ...state,
      teachers: state.teachers.filter(
        (teacher) => teacher.id !== action.payload
      ),
    }),
    editTeacher: (state, action) => {
      const updatedData = action.payload;
      const newTeacherData = state.teachers.map((teacher) => {
        if (teacher.id === updatedData.id) {
          return updatedData;
        }
        return teacher;
      });
      return {
        ...state,
        teachers: newTeacherData,
      };
    },
    teacherInput: (state, action) => ({
      ...state,
      teacherDetails: action.payload,
    }),
  },
});

export const { addTeacher, deleteTeacher, teacherInput, editTeacher } =
  teacherSlice.actions;

export default teacherSlice.reducer;
