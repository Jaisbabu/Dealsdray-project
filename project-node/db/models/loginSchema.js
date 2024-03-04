import { Schema, model } from "mongoose";

const loginSchema = Schema({
  si_no: Number,
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true, unique: true },
});

const Login = model("Login", loginSchema);

export default Login;
