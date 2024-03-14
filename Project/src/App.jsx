import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Authentication/Login";
import CreateEmployee from "./pages/CreateEmployee";
import EmployeeList from "./pages/EmployeeList";

import DashBord from "./pages/DashBord";
import EditEmployee from "./pages/EditEmployee";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

const App = () => {
  return (
    <>
      {/* <Routes>
        <Route path="/login" element={<Login />} />
      </Routes> */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />y
        <Route path="/login/create-employee" element={<CreateEmployee />} />
        <Route path="/login/dash-bord" element={<DashBord />} />
        <Route path="/login/employee-list" element={<EmployeeList />} />
        <Route path="/login/edit-employee/:id" element={<EditEmployee />} />
      </Routes>
    </>
  );
};

export default App;
