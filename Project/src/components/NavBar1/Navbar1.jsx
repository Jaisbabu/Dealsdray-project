import { useNavigate } from "react-router-dom";

import { Button } from "antd";

import "./navbar1.css";

const TaskBar1 = ({ text }) => {
  const navigate = useNavigate();
  return (
    <div className="taskbar">
      <div className="task-head">
        <img src="../../../images/img1.jpg" alt="" />
        <h1>{text}</h1>
      </div>

      <div className="task-btns">
        <Button onClick={() => navigate("/")}>HOME</Button>
        <Button onClick={() => navigate("/login")}>LOG IN</Button>
      </div>
    </div>
  );
};

export default TaskBar1;
