import {
  Input,
  Select,
  Button,
  Radio,
  Checkbox,
  Upload,
  Form,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import NavBar from "../../components/NavBar/Navbar";
import "./createemployee.css";

const CreateEmployee = () => {
  const options = ["MCA", "BCA", "BSC"];
  const [selectedOption, setSelectedOption] = useState(null);
  const [data, setData] = useState({
    name: "",
    email: "",
    mobileno: "",
    designation: "",
    gender: "",
    course: "",
    image: "",
  });
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const onChange = (e, key) => {
    setData({ ...data, [key]: e.target.value });
  };

  const onDesignation = e => {
    setData({ ...data, designation: e });
  };
  const handleCheckboxChange = option => {
    if (selectedOption === option) {
      setData({ ...data, course: null });
    } else {
      setData({ ...data, course: option });
    }
  };
  const onUploadChange = e => {
    console.log(e);
    if (e.file.response) {
      setData({ ...data, image: e.file.response.img });
    }
  };
  const onBtnClick = async () => {
    await axios.post("http://localhost:3000/employee", data);
    navigate("/dash-bord");
  };
  console.log(data);
  return (
    <div className="adduser">
      <NavBar text="ADD USER" />
      <div className="adduser-card">
        <Form form={form} layout="vertical">
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input
              placeholder="Enter your name"
              onChange={e => {
                onChange(e, "name");
              }}
              value={data.name}
            />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input
              type="email"
              placeholder="Enter your email"
              onChange={e => {
                onChange(e, "email");
              }}
              value={data.email}
            />
          </Form.Item>

          <Form.Item
            label="Mobile No"
            name="mobileno"
            rules={[
              { required: true, message: "Please enter your mobile number" },
              {
                pattern: /^\d{10}$/,
                message: "Please enter a valid 10-digit mobile number",
              },
            ]}
          >
            <Input
              type="tel"
              placeholder="Enter your mobile number"
              onChange={e => {
                onChange(e, "mobileno");
              }}
              value={data.mobileno}
            />
          </Form.Item>

          <Form.Item
            label="Designation"
            name="designation"
            rules={[{ required: true, message: "Please select a designation" }]}
          >
            <Select
              value={data.designation}
              onChange={onDesignation}
              style={{ maxWidth: "200px" }}
              options={["HR", "Manager", "Sales"].map(d => ({
                value: d,
                label: d,
              }))}
            />
          </Form.Item>

          <Form.Item
            label="Gender"
            name="gender"
            rules={[{ required: true, message: "Please select your gender" }]}
          >
            <Radio.Group
              onChange={e => {
                onChange(e, "gender");
              }}
              value={data.gender}
            >
              <Radio value="male">Male</Radio>
              <Radio value="female">Female</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label="Course"
            name="course"
            rules={[{ required: true, message: "Please select a course" }]}
          >
            <div>
              {options.map(option => (
                <Checkbox
                  key={option}
                  // value={option}
                  checked={data.course === option}
                  onChange={() => handleCheckboxChange(option)}
                >
                  {option}
                </Checkbox>
              ))}
            </div>
          </Form.Item>

          <Form.Item label="Image" name="image">
            <Upload
              name="file"
              action={"http://localhost:3000/image"}
              onChange={onUploadChange}
            >
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              onClick={onBtnClick}
              htmlType="submit"
              style={{
                width: "100px",
                marginLeft: "60%",
                backgroundColor: "black",
              }}
            >
              ADD USER
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default CreateEmployee;
