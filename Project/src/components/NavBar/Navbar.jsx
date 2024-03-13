import axios from "axios";
import { useHistory } from "react-router-dom";
import { Button } from "antd";

import "./navbar.css";

const TaskBar = ({ text }) => {
  const history = useHistory();
  const handleLogout = async () => {
    try {
      const response = await axios.post("http://localhost:3000/logout");
      console.log(response);
      if (response.status === 200) {
        history.push("/");
      } else {
        console.log("Logout failed");
      }
    } catch (error) {
      console.log("Error during logout:", error);
    }
  };

  return (
    <div className="taskbar">
      <div className="task-head">
        <img src="../../../images/img1.jpg" alt="" />
        <h1>{text}</h1>
      </div>

      <div className="task-btns">
        <Button onClick={() => navigate("/create-employee")}>
          CREATE EMPLOYEE
        </Button>
        <Button onClick={() => navigate("/employee-list")}>
          EMPLOYEE LIST
        </Button>
        <Button onClick={handleLogout}>LOG OUT</Button>
      </div>
    </div>
  );
};

export default TaskBar;
