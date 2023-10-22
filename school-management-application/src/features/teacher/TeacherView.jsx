import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteTeacher, teacherInput } from "./TeacherSlice";
import { useState } from "react";
import "../../Css/Teacher.css";
import { TeacherForm } from "./TeacherForm";

export const TeacherView = () => {
  const teacher = useSelector((state) => state.teachers.teachers);

  const dispatch = useDispatch();
  const [editTeacherStatus, setEditTeacherStatus] = useState(false);
  const [showAddTeacherForm, setShowAddTeacherForm] = useState(false);

  const handleDelete = (id) => {
    dispatch(deleteTeacher(id));
  };

  const handleEditTeacher = (teacherData) => {
    dispatch(teacherInput(teacherData));
    setEditTeacherStatus(true);
    setShowAddTeacherForm(true);
  };

  return (
    <>
      <div className="teacherView-container">
        <h1 className="heading">Teacher View</h1>
        <button
          className="add-teacher-btn"
          onClick={() => setShowAddTeacherForm(!showAddTeacherForm)}
        >
          Add New Teacher
        </button>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <td>Sn. No</td>
                <td>Name</td>
                <td>Subject</td>
                <td>Contact Info</td>
                <td>Update</td>
              </tr>
            </thead>
            <tbody>
              {teacher?.map((teacher, index) => {
                const { id, name, subject, contactInfo } = teacher;
                return (
                  <tr key={id}>
                    <td>{index + 1}</td>
                    <td>
                      {" "}
                      <Link
                        className="studentName"
                        to={`/teacherDetails/${id}`}
                      >
                        {" "}
                        {name}
                      </Link>
                    </td>
                    <td> {subject} </td>
                    <td>{contactInfo}</td>
                    <td>
                      <div className="updateBtns">
                        <span onClick={() => handleEditTeacher(teacher)}>
                          Edit
                        </span>
                        <span onClick={() => handleDelete(id)}>delete</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div>
          {showAddTeacherForm && (
            <TeacherForm
              editTeacherStatus={editTeacherStatus}
              setEditTeacherStatus={setEditTeacherStatus}
              setShowAddTeacherForm={setShowAddTeacherForm}
            />
          )}
        </div>
      </div>
    </>
  );
};
