import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import NavBar1 from "../../../components/NavBar1/Navbar1.jsx";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import { saveCreds } from "../../../utils/index.js";
import "./login.css";

const Login = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState({
    username: "",
    password: "",
  });
  const onChange = (e, key) => {
    setValue({ ...value, [key]: e.target.value });
  };
  const onBtnClick = async () => {
    try {
      const response = await axios.post("http://localhost:3000/login", value);
      saveCreds(response.data.token);
      navigate("/login/dash-board");
    } catch (e) {
      toast.error(e.response.data.message);
    }
  };

  return (
    <div className="login">
      <NavBar1 text="LOG IN" />
      <ToastContainer />
      <div className="login-card">
        <h1>LOGIN</h1>
        <Form name="login" initialValues={{ remember: true }}>
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please enter your username!" }]}
          >
            <Input
              placeholder="Username"
              onChange={e => {
                onChange(e, "username");
              }}
              value={value.username}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input.Password
              placeholder="Password"
              onChange={e => {
                onChange(e, "password");
              }}
              value={value.password}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              onClick={onBtnClick}
              htmlType="submit"
              style={{
                width: "100%",
                backgroundColor: "black",
                color: "white",
                borderColor: "black",
              }}
            >
              LOGIN
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
