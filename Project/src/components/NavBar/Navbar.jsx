import { useNavigate } from "react-router-dom";

import { Button } from "antd";

import "./navbar.css";

const TaskBar = ({ text }) => {
  const navigate = useNavigate();
  const onLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("role");
    navigate("/");
  };
  return (
    <div className="taskbar">
      <div className="task-head">
        <img src="../../../images/img1.jpg" alt="" />
        <h1>{text}</h1>
      </div>

      <div className="task-btns">
        <Button onClick={() => navigate("/login/create-employee")}>
          CREATE EMPLOYEE
        </Button>
        <Button onClick={() => navigate("/login/employee-list")}>
          EMPLOYEE LIST
        </Button>
        <Button onClick={onLogout}>LOG OUT</Button>
      </div>
    </div>
  );
};

export default TaskBar;
