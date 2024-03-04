import React from "react";
import { Form, Input, Select, Button } from "antd";
import NavBar from "../../components/NavBar/Navbar";

const { Option } = Select;

const prefixSelector = (
  <Form.Item name="prefix" noStyle>
    <Select
      style={{
        width: 70,
      }}
    >
      <Option value="86">+86</Option>
      <Option value="87">+87</Option>
    </Select>
  </Form.Item>
);

const DashBord = () => {
  const onFinish = values => {
    console.log("Received values of form: ", values);
  };

  return (
    <div className="dashbord">
      <NavBar text="Dash Bord" />
      <h1>Welcome To Admin Panel</h1>
    </div>
  );
};

export default DashBord;
