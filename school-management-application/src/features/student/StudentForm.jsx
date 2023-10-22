import { useDispatch, useSelector } from "react-redux";
import { addStudent, editStudent, studentInput } from "./studentSlice";
import "../../Css/Student.css";
import "../../Css/Teacher.css";

export const StudentForm = ({
  editStatus,
  setEditStatus,
  setShowStudentForm,
}) => {
  const student = useSelector((state) => state.students.students);
  const studentDetails = useSelector((state) => state.students.studentDetails);

  const dispatch = useDispatch();

  const handleStudentFormInput = (e) => {
    const { name, value } = e.target;
    dispatch(studentInput({ ...studentDetails, [name]: value }));
  };

  const handleAddStudent = (e) => {
    e.preventDefault();

    if (editStatus) {
      dispatch(editStudent(studentDetails));
      setEditStatus(false);
      setShowStudentForm(false);
      dispatch(
        studentInput({
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
        })
      );
    } else {
      const data = { ...studentDetails, id: student.length + 1 };
      dispatch(addStudent(data));
      setEditStatus(false);
      setShowStudentForm(false);
      dispatch(
        studentInput({
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
        })
      );
    }
  };
  return (
    <>
      <div
        className={`student-modal ${editStatus ? "student-modal-show" : ""}`}
      >
        <div className="modal-content">
          <button
            className="close-form"
            onClick={() => setShowStudentForm(false)}
          >
            &times;
          </button>
          <h2>{editStatus ? "Edit Student" : "Add Student"}</h2>
          <form className="form" onSubmit={handleAddStudent}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              value={studentDetails?.name}
              placeholder=""
              onChange={handleStudentFormInput}
            />
            <label htmlFor="age">Age</label>
            <input
              type="number"
              name="age"
              value={studentDetails?.age}
              placeholder=""
              onChange={handleStudentFormInput}
            />
            <label htmlFor="grade">Grade</label>
            <input
              type="text"
              name="grade"
              value={studentDetails?.grade}
              placeholder=""
              onChange={handleStudentFormInput}
            />
            <label htmlFor="studentClass">Class</label>
            <input
              type="number"
              name="studentClass"
              value={studentDetails?.studentClass}
              placeholder=""
              min="1"
              max="12"
              onChange={handleStudentFormInput}
            />
            <label htmlFor="gender">Gender</label>
            <div>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={studentDetails?.gender === "male"}
                placeholder=""
                onChange={handleStudentFormInput}
              />
              Male
              <input
                type="radio"
                name="gender"
                value="female"
                checked={studentDetails?.gender === "female"}
                placeholder=""
                onChange={handleStudentFormInput}
              />
              Female
            </div>
            <label htmlFor="attendance">Attendance</label>
            <input
              type="number"
              name="attendance"
              value={studentDetails?.attendance}
              placeholder=""
              onChange={handleStudentFormInput}
            />
            <label htmlFor="marks">Marks</label>
            <input
              type="number"
              name="marks"
              value={studentDetails?.marks}
              placeholder=""
              onChange={handleStudentFormInput}
            />
            <button type="submit"> {editStatus ? "Update" : "Add"} </button>
          </form>
        </div>
      </div>
    </>
  );
};
