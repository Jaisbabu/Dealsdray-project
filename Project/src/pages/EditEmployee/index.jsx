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
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import NavBar from "../../components/NavBar/Navbar";
import "./editemployee.css";

const EditEmployee = () => {
  const { id } = useParams();
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
  const [edit, setEdit] = useState({});
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const fetchById = async () => {
    try {
      console.log(id);
      const response = await axios.get(`http://localhost:3000/employee/${id}`);
      setData({ ...data, ...response.data });
    } catch (error) {
      console.error("Error fetching employee data:", error);
    }
  };
  useEffect(() => {
    fetchById();
  }, []);

  const onChange = (e, key) => {
    setData({ ...data, [key]: e.target.value });
    setEdit({ ...edit, [key]: e.target.value });
  };

  const onDesignation = e => {
    setData({ ...data, designation: e });
    setEdit({ ...edit, designation: e });
  };
  const handleCheckboxChange = option => {
    if (selectedOption === option) {
      setData({ ...data, course: null });
      setEdit({ ...edit, course: null });
    } else {
      setData({ ...data, course: option });
      setEdit({ ...edit, course: option });
    }
  };
  const onUploadChange = e => {
    console.log(e);
    if (e.file.response) {
      setData({ ...data, image: e.file.response.img });
      setEdit({ ...edit, image: e.file.response.img });
    }
  };

  const onBtnClick = async id => {
    await axios.patch(`http://localhost:3000/employee/${id}`, edit);
    navigate("/employee-list");
  };
  console.log(edit);
  console.log(data);
  return (
    <div className="editemployee">
      <NavBar text="Edit USER" />
      <div className="adduser-card">
        <Form form={form} layout="vertical" value>
          <Form.Item label="Name">
            <Input
              value={data.name}
              placeholder="Enter your name"
              onChange={e => {
                onChange(e, "name");
              }}
            />
          </Form.Item>

          <Form.Item label="Email">
            <Input
              value={data.email}
              type="email"
              placeholder="Enter your email"
              onChange={e => {
                onChange(e, "email");
              }}
            />
          </Form.Item>

          <Form.Item label="Mobile No">
            <Input
              value={data.mobileno}
              type="tel"
              placeholder="Enter your mobile number"
              onChange={e => {
                onChange(e, "mobileno");
              }}
            />
          </Form.Item>

          <Form.Item label="Designation">
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

          <Form.Item label="Gender">
            <Radio.Group
              value={data.gender}
              onChange={e => {
                onChange(e, "gender");
              }}
              // value={data.gender}
            >
              <Radio value="male">Male</Radio>
              <Radio value="female">Female</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="Course">
            <div>
              {options.map(option => (
                <Checkbox
                  // value={data.course}
                  key={option}
                  checked={data.course === option}
                  onChange={() => handleCheckboxChange(option)}
                >
                  {option}
                </Checkbox>
              ))}
            </div>
          </Form.Item>

          <Form.Item label="Image">
            <Upload
              value={data.image}
              action={"http://localhost:3000/image"}
              onChange={onUploadChange}
            >
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              onClick={() => {
                onBtnClick(data._id);
              }}
              htmlType="submit"
              style={{
                width: "100px",
                marginLeft: "60%",
                backgroundColor: "black",
              }}
            >
              Edit USER
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default EditEmployee;
