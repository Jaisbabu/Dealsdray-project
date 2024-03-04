import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import CreateEmployee from "./pages/CreateEmployee";
import EmployeeList from "./pages/EmployeeList";
import DashBord from "./pages/DashBord";
import EditEmployee from "./pages/EditEmployee";
import "./App.css";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/create-employee" element={<CreateEmployee />} />
      <Route path="/dash-bord" element={<DashBord />} />
      <Route path="/employee-list" element={<EmployeeList />} />
      <Route path="/edit-employee/:id" element={<EditEmployee />} />
    </Routes>
  );
};

export default App;
