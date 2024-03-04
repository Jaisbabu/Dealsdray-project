import { useNavigate } from "react-router-dom";

import { Button } from "antd";

import "./navbar.css";

const TaskBar = ({ text }) => {
  const navigate = useNavigate();
  return (
    <div className="taskbar">
      <div className="task-head">
        <img src="../../../images/img1.jpg" alt="" />
        <h1>{text}</h1>
      </div>

      <div className="task-btns">
        {/* <Button onClick={() => navigate("/")}>HOME</Button> */}

        <Button onClick={() => navigate("/create-employee")}>
          CREATE EMPLOYEE
        </Button>
        <Button onClick={() => navigate("/employee-list")}>
          EMPLOYEE LIST
        </Button>
        <Button onClick={() => navigate("/")}>LOG OUT</Button>
      </div>
    </div>
  );
};

export default TaskBar;
