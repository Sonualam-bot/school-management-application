import { configureStore } from "@reduxjs/toolkit";
import studentReducer from "./features/student/studentSlice";
import teacherReducer from "./features/teacher/TeacherSlice";

const store = configureStore({
  reducer: {
    students: studentReducer,
    teachers: teacherReducer,
  },
});

export default store;
