import { NavLink } from "react-router-dom";
import "../Css/Header.css";
import schoolImg from "../assets/school.png";

export const Header = () => {
  return (
    <>
      <div className="header">
        <img src={schoolImg} alt="school" />
        <h2>School Management Application</h2>
        <div className="header-links">
          <NavLink className="navlink" to="/">
            Home
          </NavLink>
          <NavLink className="navlink" to="/student">
            student
          </NavLink>
          <NavLink className="navlink" to="/teacher">
            Teacher
          </NavLink>
        </div>
      </div>
    </>
  );
};
