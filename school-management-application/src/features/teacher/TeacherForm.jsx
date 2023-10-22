import { useDispatch, useSelector } from "react-redux";
import { addTeacher, editTeacher, teacherInput } from "./TeacherSlice";

export const TeacherForm = ({
  editTeacherStatus,
  setShowAddTeacherForm,
  setEditTeacherStatus,
}) => {
  const teacher = useSelector((state) => state.teachers.teachers);
  const teacherDetails = useSelector((state) => state.teachers.teacherDetails);

  const dispatch = useDispatch();

  const handleTeacherFormInput = (e) => {
    const { name, value } = e.target;
    dispatch(teacherInput({ ...teacherDetails, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (editTeacherStatus) {
      dispatch(editTeacher(teacherDetails));
      setEditTeacherStatus(false);
      setShowAddTeacherForm(false);
      dispatch(
        teacherInput({
          name: "",
          subject: "",
          contactInfo: "",
        })
      );
    } else {
      const data = { ...teacherDetails, id: teacher.length + 1 };
      dispatch(addTeacher(data));
      setEditTeacherStatus(false);
      setShowAddTeacherForm(false);
      dispatch(
        teacherInput({
          name: "",
          subject: "",
          contactInfo: "",
        })
      );
    }
  };

  return (
    <>
      <div
        className={`teacher-modal ${
          editTeacherStatus ? "teacher-modal-show" : ""
        }`}
      >
        <div className="modal-content">
          <button
            className="close-button"
            onClick={() => setShowAddTeacherForm(false)}
          >
            &times;
          </button>
          <h2>{editTeacherStatus ? "Edit Teacher" : "Add Teacher"}</h2>
          <form onSubmit={(e) => handleFormSubmit(e)}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              value={teacherDetails?.name}
              onChange={handleTeacherFormInput}
            />
            <label htmlFor="subject">Subject</label>
            <input
              type="text"
              name="subject"
              value={teacherDetails?.subject}
              onChange={handleTeacherFormInput}
            />
            <label htmlFor="contactInfo">Contact Info</label>
            <input
              type="email"
              name="contactInfo"
              placeholder="Enter email"
              value={teacherDetails?.contactInfo}
              onChange={handleTeacherFormInput}
            />
            <button className="submitBtn" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
