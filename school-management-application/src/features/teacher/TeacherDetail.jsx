import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export const TeacherDetail = () => {
  const { teacherId } = useParams();
  const teacher = useSelector((state) => state.teachers.teachers);

  const selectedTeacher = teacher?.find(
    (teachers) => teachers.id === +teacherId
  );

  const { name, subject, contactInfo } = selectedTeacher;

  return (
    <>
      <div className="studentDetails">
        <h2>Name: {name}</h2>
        <p>subject: {subject}</p>
        <p>Email: {contactInfo}</p>
      </div>
    </>
  );
};
