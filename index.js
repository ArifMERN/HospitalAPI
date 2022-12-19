require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
const patientRoute = require("./routes/Patient");
const doctorRouter = require("./routes/Doctor");
const reportRouter = require("./routes/Report");
const connectDB = require("./config/dbConn");
const port = process.env.PORT || 3500;
const app = express();
connectDB();
app.use(bodyParser.json());
app.use("/patient", patientRoute);
app.use("/doctor", doctorRouter);
app.use("/report", reportRouter);
app.use("/", express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.listen(port, () => {
  console.log(`connected at port ${port}`);
});
