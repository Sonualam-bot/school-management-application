import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://school-management-system-3bma.onrender.com/api/v1";

export const fetchStudents = createAsyncThunk(
  "students/fetchStudents",
  async () => {
    const response = await axios.get(`${BASE_URL}/student/all`);
    return response.data.student;
  }
);

export const addStudentAsync = createAsyncThunk(
  "students/addStudentAsync",
  async (newStudent) => {
    const response = await axios.post(`${BASE_URL}/student/new`, newStudent);
    return response.data.student;
  }
);

export const updateStudentAsync = createAsyncThunk(
  "students/updateStudentAsync",
  async ({ id, updatedStudent }) => {
    const response = await axios.post(
      `${BASE_URL}/student/edit/${id}`,
      updatedStudent
    );
    return response.data.student;
  }
);

export const deleteStudentAsync = createAsyncThunk(
  "students/deleteStudentAsync",
  async (id) => {
    const response = await axios.delete(`${BASE_URL}/student/delete/${id}`);
    return response.data.student;
  }
);

const initialState = {
  students: [],
  status: "idle",
  studentDetails: {
    name: "",
    age: "",
    grade: "",
    studentClass: "",
    gender: "",
    attendance: "",
    marks: "",
  },
  sortBy: "",
};

const StudentSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    // addStudent: (state, action) => ({
    //   ...state,
    //   students: [...state.students, action.payload],
    // }),
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
    setStudentInput: (state, action) => ({
      ...state,
      studentDetails: action.payload,
    }),
    sortByGender: (state, action) => ({
      ...state,
      sortBy: action.payload,
    }),
  },
  extraReducers: {
    [fetchStudents.pending]: (state) => {
      state.status = "loading";
    },
    [fetchStudents.fulfilled]: (state, action) => {
      state.status = "success";
      state.students = action.payload;
    },
    [fetchStudents.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },

    [addStudentAsync.pending]: (state) => {
      state.status = "loading";
    },
    [addStudentAsync.fulfilled]: (state, action) => {
      state.status = "success";
      state.students.push(action.payload);
    },
    [addStudentAsync.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [updateStudentAsync.pending]: (state) => {
      state.status = "loading";
    },
    [updateStudentAsync.fulfilled]: (state, action) => {
      state.status = "success";
      const updatedStudent = action.payload;
      const index = state.students.findIndex(
        (s) => s._id === updatedStudent._id
      );
      if (index !== -1) {
        state.students[index] = updatedStudent;
      }
    },
    [updateStudentAsync.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [deleteStudentAsync.pending]: (state) => {
      state.status = "loading";
    },
    [deleteStudentAsync.fulfilled]: (state, action) => {
      state.status = "success";
      state.students = state.students.filter(
        (student) => student._id !== action.payload._id
      );
    },
    [deleteStudentAsync.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
  },
});

export const {
  addStudent,
  deleteStudent,
  setStudentInput,
  editStudent,
  sortByGender,
} = StudentSlice.actions;

export default StudentSlice.reducer;
