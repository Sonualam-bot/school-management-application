const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());

const student = require("./routes/Student.rotues");
const teacher = require("./routes/Teacher.Routes");

app.get("/", (req, res) => {
  res.send("School Management System");
});

const corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));

app.use("/api/v1", student);
app.use("/api/v1", teacher);

module.exports = app;
