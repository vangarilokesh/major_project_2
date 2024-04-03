const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

mongoose
  .connect("mongodb+srv://lokesh:qwerty56@cluster0.yhoanuy.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

const newTeacherSchema = new mongoose.Schema({
  userid: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  classYear: {
    type: Number,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
  section: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
});

const passHistory = new mongoose.Schema({
  rollno: {
    type: String,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  passGeneratedDate: {
    type: Date,
    required: true,
  },
  exitDate: {
    type: Date,
    required: true,
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
});

const outPassSchema = new mongoose.Schema({
  rollno: {
    type: String,
    required: true,
    unique: true,
  },
  reason: {
    type: String,
    required: true,
  },
  passGeneratedDate: {
    type: Date,
    required: true,
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
});

const newStudentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  rollno: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  classYear: {
    type: Number,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
  section: {
    type: String,
    required: true,
  },
});

const teacherdb = mongoose.model("teacherdb", newTeacherSchema);
const outPassCollection = mongoose.model("outPassCollection", outPassSchema);
const passCollections = mongoose.model("passCollections", passHistory);
const studentdb = mongoose.model("studentdb", newStudentSchema);

app.get("/", cors(), (req, res) => {});

app.post("/login", async (req, res) => {
  // Implementation for login route
  
});

app.post("/signup", async (req, res) => {
  // Implementation for signup route
});

app.post("/addStudent", async (req, res) => {
  // Implementation for addStudent route
});

app.post("/getClass", async (req, res) => {
  // Implementation for getClass route
});

app.post("/getPasses", async (req, res) => {
  // Implementation for getPasses route
});

app.post("/generatePass", async (req, res) => {
  // Implementation for generatePass route
});

app.post("/verifyPass", async (req, res) => {
  // Implementation for verifyPass route
});

app.post("/verifyPass_api", async (req, res) => {
  // Implementation for verifyPass_api route
});

app.post("/delete", async (req, res) => {
  // Implementation for delete route
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
