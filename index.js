const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const patientRoute = require("./routes/Patient");
const doctorRouter = require("./routes/Doctor");
const reportRouter = require("./routes/Report");
const port = 5000;
const app = express();
mongoose.connect(
  "mongodb+srv://m001-student:PW1TgsaONA6EpKNm@cluster0.ighmvwf.mongodb.net/test",
  { useNewUrlParser: true },
  () => {
    console.log("mongoDB connected");
  }
);
// mongoose.set("strictQuery", true);
app.use(bodyParser.json());
app.use("/patient", patientRoute);
app.use("/doctor", doctorRouter);
app.use("/report", reportRouter);
app.get("/", (req, res) => {
  console.log("in path");
  res.send("Hello Arif");
});

app.listen(port, () => {
  console.log(`connected at port ${port}`);
});
