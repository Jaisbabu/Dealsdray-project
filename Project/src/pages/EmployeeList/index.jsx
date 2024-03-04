import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar/Navbar";
import "./employeeList.css";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/employee");
      setEmployees(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const onDelete = async id => {
    await axios.delete(`http://localhost:3000/employee/${id}`);
    fetchData();
    // navigate("/employee-list");
  };
  const onEdit = id => {
    navigate(`/edit-employee/:${id}`);
    console.log(id);
  };
  return (
    <div className="employee-list">
      <NavBar text="Employee List" />

      <div className="content">
        <div className="toolbar">
          <span>Total Count: {employees.length}</span>
          <button>Create Employee</button>
          <input type="text" placeholder="Search" />
          <select>
            <option value="">Search Filter</option>
          </select>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Unique Id</th>
                <th>Image</th>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile No</th>
                <th>Designation</th>
                <th>Gender</th>
                <th>Course</th>
                <th>Create date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {employees.map(employee => (
                <tr key={employee.id}>
                  <td>{employee._id}</td>
                  <td>
                    <img
                      src={employee.image}
                      style={{ width: "50px" }}
                      alt=""
                    />
                  </td>
                  <td>{employee.name}</td>
                  <td>{employee.email}</td>
                  <td>{employee.mobileno}</td>
                  <td>{employee.designation}</td>
                  <td>{employee.gender}</td>
                  <td>{employee.course}</td>
                  <td>{new Date(employee.createDate).toLocaleDateString()}</td>
                  <td className="edit-delete">
                    <div className="edit-dele">
                      <i
                        class="fa-solid fa-trash"
                        onClick={() => {
                          onDelete(employee._id);
                        }}
                      ></i>
                      <i
                        class="fa-solid fa-pen-to-square"
                        onClick={() => {
                          onEdit(employee._id);
                        }}
                      ></i>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="pagination">{/* Add pagination controls here */}</div>
      </div>
    </div>
  );
};

export default EmployeeList;
