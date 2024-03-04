import { Schema, model } from "mongoose";
import validator from "validator";

const { isEmail } = validator;

const employeeSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [isEmail, "Please enter a valid email"],
  },
  mobileno: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return validator.isMobilePhone(v, "any", { strictMode: false });
      },
      message: "Invalid mobile number",
    },
  },
  designation: {
    type: String,
    enum: ["HR", "Manager", "Sales"],
    required: true,
  },
  gender: {
    type: String,
    enum: ["male", "female"],
    required: true,
  },
  course: {
    type: [String],
    enum: ["MCA", "BCA", "BSC"],
    validate: {
      validator: function (v) {
        return v.length === 1;
      },
      message: "Only one course can be selected",
    },
  },
  image: String,
  createDate: {
    type: Date,
    default: Date.now,
  },
});

const Employee = model("Employee", employeeSchema);

export default Employee;
