import express from "express";
import mongoose from "./db/DBconnection.js";
import Employee from "./db/models/employeeSchema.js";
import multer from "multer";
import cors from "cors";
import jwt from "jsonwebtoken";
import Login from "./db/models/loginSchema.js";

const secret_key = "slkvnorifjqwldmqlkwndokwievjmpwrlwfwvkem";

const checkToken = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    console.log(token);
    if (!token) {
      return res.status(403).json({ message: "You are not authorized" });
    }
    const ogToken = token.split(" ")[1];
    const isValid = jwt.verify(ogToken, secret_key);
    next();
  } catch (e) {
    return res.status(403).json({ message: "You are not authorized" });
  }
};

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

app.post("/login/employee", checkToken, async (req, res) => {
  try {
    await Employee.create(req.body);
    res.status(201).json({ message: "Product added" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get("/login/employee", checkToken, async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get("/login/employee/:id", checkToken, async (req, res) => {
  try {
    const id = req.params.id;
    const employees = await Employee.findById(id);
    res.status(200).json(employees[0]);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.delete("/login/employee/:id", checkToken, async (req, res) => {
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
    const body = { ...req.body };
    const user = await Login.findOne({ username: body.username });
    if (!user) {
      return res.status(403).json({ message: "Invalid username or password" });
    }
    const isMatching = await Login.findOne({ password: body.password });
    if (!isMatching) {
      return res.status(403).json({ message: "Invalid username or password" });
    }

    // const secret_key = "slkvnorifjqwldmqlkwndokwievjmpwrlwfwvkem";

    const token = jwt.sign({ role: "ADMIN", id: Login._id }, secret_key, {
      expiresIn: "7d",
    });
    console.log(token);
    return res.status(200).json({ message: "Login Successfull", token: token });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred. Please try again later.",
    });
  }
});

app.patch("/login/employee/:id", checkToken, async (req, res) => {
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

app.post("/logout", (req, res) => {
  try {
    res.sendStatus(200);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(3000, (req, res) => {
  console.log("App is running");
});
