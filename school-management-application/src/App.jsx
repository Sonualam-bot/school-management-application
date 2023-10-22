import "./App.css";
import { Header } from "./component/Header";
import { Route, Routes } from "react-router-dom";
import { StudentView } from "./features/student/StudentView";
import { StudentDetail } from "./features/student/StudentDetail";
import { TeacherView } from "./features/teacher/TeacherView";
import { TeacherDetail } from "./features/teacher/TeacherDetail";
import { Homempage } from "./pages/Homepage";
function App() {
  return (
    <>
      <Header />
      <div>
        <Routes>
          <Route path="/" element={<Homempage />} />
          <Route path="/student" element={<StudentView />} />
          <Route path="/details/:studentId" element={<StudentDetail />} />
          <Route path="/teacher" element={<TeacherView />} />
          <Route
            path="/teacherDetails/:teacherId"
            element={<TeacherDetail />}
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
