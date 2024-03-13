import express from "express";
import mongoose from "./db/DBconnection.js";
import Employee from "./db/models/employeeSchema.js";
import multer from "multer";
import cors from "cors";
import Login from "./db/models/loginSchema.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("uploads"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

app.post("/image", upload.single("file"), (req, res) => {
  try {
    res.json({ img: `http://localhost:3000/${req.file.filename}` });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post("/employee", async (req, res) => {
  try {
    await Employee.create(req.body);
    res.status(201).json({ message: "Product added" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get("/employee", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get("/employee/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const employees = await Employee.findById(id);
    res.status(200).json(employees[0]);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.delete("/employee/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await Employee.findByIdAndDelete(id);
    res.status(200).json({ message: "Data deleted" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await Login.findOne({ username });
    console.log(user);
    if (!user || user.password !== password) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid username or password" });
    }
    res.status(200).json({ success: true, message: "Login successful" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred. Please try again later.",
    });
  }
});

app.patch("/employee/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await Employee.fi;
    await Employee.findByIdAndUpdate(id, req.body);
    await Employee.fi;
    res.status(200).json({ message: "Data updated" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(3000, (req, res) => {
  console.log("App is running");
});
