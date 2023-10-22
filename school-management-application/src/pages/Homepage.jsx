import { useSelector } from "react-redux";
import "../Css/Homepage.css";
import { Link } from "react-router-dom";

export const Homempage = () => {
  const student = useSelector((state) => state.students.students);

  const highestMarks = Math.max(...student.map((student) => student.marks));
  const topStudents = student.filter(
    (student) => student.marks === highestMarks
  );

  const averageAttendance =
    student?.reduce((acc, curr) => acc + +curr.attendance, 0) / student.length;

  const averageMarks =
    student?.reduce((acc, curr) => acc + +curr.marks, 0) / student.length;

  return (
    <>
      <div className="schoolWide">
        <div className="schoolWide-special">
          <p>{student?.length} </p>
          <p>Total Students</p>
        </div>
        <div className="schoolWide-special">
          <p>{averageAttendance} </p>
          <p>Average Attendance</p>
        </div>
        <div className="schoolWide-special">
          <p>{averageMarks} </p>
          <p>Average marks</p>
        </div>
        <div className="schoolWide-special">
          <p>Top Student</p>
          {topStudents.map((std) => {
            return (
              <>
                <span> {std.name} </span>
              </>
            );
          })}
        </div>
      </div>
      <div className="github">
        <h1>Github</h1>
        <Link
          className="link"
          to="https://github.com/Sonualam-bot/school-management-application"
          target="_blank"
        >
          Click Here
        </Link>
      </div>
    </>
  );
};
