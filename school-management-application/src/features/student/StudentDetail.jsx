import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "../../Css/Student.css";

export const StudentDetail = () => {
  const { studentId } = useParams();
  const student = useSelector((state) => state.students.students);
  const selectedStudent = student?.find((student) => student._id === studentId);

  const { name, age, grade, studentClass, gender, attendance, marks } =
    selectedStudent;

  return (
    <>
      <div className="studentDetails">
        <h2>Name: {name}</h2>
        <p>Age: {age}</p>
        <p>Grade: {grade}</p>
        <p>Class: {studentClass}</p>
        <p>Gender: {gender}</p>
        <p>Attendance: {attendance}</p>
        <p>Marks: {marks}</p>
      </div>
    </>
  );
};
