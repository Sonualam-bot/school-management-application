import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://school-management-system-3bma.onrender.com/api/v1";

export const fetchTeachers = createAsyncThunk(
  "teachers/fetchTeachers",
  async () => {
    const response = await axios.get(`${BASE_URL}/teacher/all`);
    return response.data.teacher;
  }
);

export const addTeacherAsync = createAsyncThunk(
  "teachers/addTeacherAsync",
  async (newTeacher) => {
    const response = await axios.post(`${BASE_URL}/teacher/new`, newTeacher);
    return response.data.teacher;
  }
);

export const updateTeacherAsync = createAsyncThunk(
  "teacher/updateTeacherAsync",
  async ({ id, updatedTeacher }) => {
    const response = await axios.post(
      `${BASE_URL}/teacher/edit/${id}`,
      updatedTeacher
    );
    return response.data.teacher;
  }
);

export const deleteTeacherAsync = createAsyncThunk(
  "teachers/deleteTeacherAsync",
  async (id) => {
    const response = await axios.delete(`${BASE_URL}/teacher/delete/${id}`);
    return response.data.teacher;
  }
);

const initialState = {
  teachers: [],
  status: "idle",
  teacherDetails: {
    id: "",
    name: "",
    subject: "",
    contactInfo: "",
  },
};

const teacherSlice = createSlice({
  name: "teachers",
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
    setTeacherInput: (state, action) => ({
      ...state,
      teacherDetails: action.payload,
    }),
  },
  extraReducers: {
    [fetchTeachers.pending]: (state) => {
      state.status = "loading";
    },
    [fetchTeachers.fulfilled]: (state, action) => {
      state.status = "success";
      state.teachers = action.payload;
    },
    [fetchTeachers.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },

    [addTeacherAsync.pending]: (state) => {
      state.status = "loading";
    },
    [addTeacherAsync.fulfilled]: (state, action) => {
      state.status = "success";
      state.teachers.push(action.payload);
    },
    [addTeacherAsync.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [updateTeacherAsync.pending]: (state) => {
      state.status = "loading";
    },
    [updateTeacherAsync.fulfilled]: (state, action) => {
      state.status = "success";
      const updatedTeacher = action.payload;
      const index = state.teachers.findIndex(
        (s) => s._id === updatedTeacher._id
      );
      if (index !== -1) {
        state.teachers[index] = updatedTeacher;
      }
    },
    [updateTeacherAsync.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [deleteTeacherAsync.pending]: (state) => {
      state.status = "loading";
    },
    [deleteTeacherAsync.fulfilled]: (state, action) => {
      state.status = "success";
      state.teachers = state.teachers.filter(
        (teacher) => teacher._id !== action.payload._id
      );
    },
    [deleteTeacherAsync.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
  },
});

export const { addTeacher, deleteTeacher, setTeacherInput, editTeacher } =
  teacherSlice.actions;

export default teacherSlice.reducer;
