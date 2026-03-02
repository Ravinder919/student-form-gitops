const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// ✅ CORS FIX
app.use(cors({
  origin: "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb://mongo:27017/studentdb");

// Student schema
const Student = mongoose.model("Student", {
  studentId: String,
  name: String,
  age: Number,
  class: String
});

// Save student
app.post("/students", async (req, res) => {
  await new Student(req.body).save();
  res.json({ message: "Student saved successfully" });
});

// Get students
app.get("/students", async (req, res) => {
  res.json(await Student.find());
});

app.listen(3000, () => console.log("Backend running on port 3000"));

// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");

// const app = express();

// /* ======================
//    Middleware
// ====================== */
// app.use(cors({
//   origin: "*",
//   methods: ["GET", "POST"],
//   allowedHeaders: ["Content-Type"]
// }));

// app.use(express.json());

// /* ======================
//    MongoDB Connection
// ====================== */
// mongoose.connect("mongodb://mongo:27017/studentdb", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });

// mongoose.connection.on("connected", () => {
//   console.log("MongoDB connected");
// });

// /* ======================
//    Student Schema
// ====================== */
// const StudentSchema = new mongoose.Schema({
//   studentId: {
//     type: String,
//     required: true,
//     unique: true     // 🚫 no duplicate IDs
//   },
//   name: {
//     type: String,
//     required: true   // 🚫 name must exist
//   },
//   age: {
//     type: Number,
//     required: true
//   },
//   class: {
//     type: String,
//     required: true
//   }
// });

// const Student = mongoose.model("Student", StudentSchema);

// /* ======================
//    APIs
// ====================== */

// // ✅ Save student
// app.post("/students", async (req, res) => {
//   try {
//     await new Student(req.body).save();
//     res.json({ message: "Student saved successfully" });
//   } catch (err) {
//     if (err.code === 11000) {
//       // duplicate key error
//       res.status(400).json({ message: "Student ID already exists" });
//     } else {
//       res.status(500).json({ message: "Error saving student" });
//     }
//   }
// });

// // ✅ Get all students
// app.get("/students", async (req, res) => {
//   const students = await Student.find({}, { __v: 0 });
//   res.json(students);
// });

// /* ======================
//    Start Server
// ====================== */
// app.listen(3000, () => {
//   console.log("Backend running on port 3000");
// });

