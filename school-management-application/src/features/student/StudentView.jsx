import { useDispatch, useSelector } from "react-redux";
import "../../Css/Student.css";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { StudentForm } from "./StudentForm";
import {
  deleteStudentAsync,
  fetchStudents,
  setStudentInput,
} from "./studentSlice";

export const StudentView = () => {
  // const setStudentInput = useSelector((state) => state.students.studentDetails);
  const status = useSelector((state) => state.students.status);
  const student = useSelector((state) => state.students.students);

  const [showStudentForm, setShowStudentForm] = useState(false);
  const [editStatus, setEditStatus] = useState(false);
  const [studentGender, setStudentGender] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [byClass, setByClass] = useState("All");

  const dispatch = useDispatch();

  // const handleDelete = (id) => {
  //   dispatch(deleteStudent(id));
  // };

  const handleEditStudent = (studentData) => {
    dispatch(setStudentInput(studentData));
    setEditStatus(true);
    setShowStudentForm(true);
  };

  const getStudentGender = (e) => {
    setStudentGender(e.target.value);
  };

  const filterStudentByGender =
    studentGender === ""
      ? student
      : student?.filter((std) => std.gender === studentGender);

  let sortedStudent = [...filterStudentByGender];

  if (sortBy === "name") {
    sortedStudent.sort((a, b) => b.name.localeCompare(a.name));
  } else if (sortBy === "age") {
    sortedStudent.sort((a, b) => b.age - a.age);
  } else if (sortBy === "attendance") {
    sortedStudent.sort((a, b) => b.attendance - a.attendance);
  } else if (sortBy === "marks") {
    sortedStudent.sort((a, b) => b.marks - a.marks);
  }

  const numberOfClass = student?.reduce((acc, curr) => {
    if (acc.includes(curr.studentClass)) {
      return acc;
    } else {
      return [...acc, curr.studentClass];
    }
  }, []);

  const filterByClass =
    byClass === "All"
      ? sortedStudent
      : sortedStudent?.filter((std) => std.studentClass === byClass);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchStudents());
    }
  }, [status, dispatch]);

  const deleteStd = (id) => {
    dispatch(deleteStudentAsync(id));
  };

  return (
    <>
      <div className="teacherView-container">
        <h1 className="heading">Student View</h1>
        <button
          className="add-teacher-btn"
          onClick={() => setShowStudentForm(!showStudentForm)}
        >
          Add New Student
        </button>

        <div className="table-container">
          <div className="sortBySection">
            <fieldset>
              <legend>Sort By Gender</legend>

              <select onChange={(e) => getStudentGender(e)}>
                <option value="">Select Gender</option>

                <option name="gender" value="Male">
                  Male
                </option>
                <option name="gender" value="Female">
                  Female
                </option>
              </select>

              <select onChange={(e) => setSortBy(e.target.value)}>
                <option>Sort By</option>
                <option value="name">Name</option>
                <option value="age">Age</option>
                <option value="attendance">Attendance</option>
                <option value="marks">Marks</option>
              </select>

              <select onChange={(e) => setByClass(e.target.value)}>
                <option value="All">filter By Class</option>
                {numberOfClass?.map((stdClass) => {
                  return (
                    <option value={stdClass} key={stdClass}>
                      {stdClass}
                    </option>
                  );
                })}
              </select>
            </fieldset>
          </div>

          <table>
            <thead>
              <tr>
                <td>Sn. No</td>
                <td>Name</td>
                <td>Age</td>
                <td>Grade</td>
                <td>Class</td>
                <td>Gender</td>
                <td>Attendance</td>
                <td>Marks</td>
                <td>Update</td>
              </tr>
            </thead>
            <tbody>
              {filterByClass?.map((student, index) => {
                const {
                  _id,
                  name,
                  age,
                  grade,
                  studentClass,
                  gender,
                  attendance,
                  marks,
                } = student;
                return (
                  <tr key={_id}>
                    <td>{index + 1}</td>
                    <td>
                      {" "}
                      <Link className="studentName" to={`/details/${_id}`}>
                        {" "}
                        {name}
                      </Link>
                    </td>
                    <td>{age}</td>
                    <td>{grade}</td>
                    <td>{studentClass}</td>
                    <td>{gender}</td>
                    <td>{attendance}</td>
                    <td>{marks}</td>
                    <td>
                      <div className="updateBtns">
                        <span onClick={() => handleEditStudent(student)}>
                          edit
                        </span>
                        <span onClick={() => deleteStd(_id)}>delete</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div>
          {showStudentForm && (
            <StudentForm
              editStatus={editStatus}
              setEditStatus={setEditStatus}
              setShowStudentForm={setShowStudentForm}
            />
          )}
        </div>
      </div>
    </>
  );
};
