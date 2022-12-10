const express = require("express");
const patientRouter = express.Router();
const Patient = require("../model/Patient");
const Report = require("../model/Reports");
const Doctor = require("../model/Doctor");
const { checkToken, verifier } = require("./Auth/Auth");

patientRouter.post("/register", checkToken, async (req, res) => {
  const { status, id } = verifier(req.token);
  if (status) {
    try {
      const checkPatient = await Patient.findOne({
        phoneNumber: req.body.number,
      });
      if (checkPatient != null) {
        res.status(404).json("user already exists");
      } else {
        const newPatient = new Patient({
          name: req.body.name,
          phoneNumber: req.body.number,
          consultedTo: id,
        });
        const patient = await newPatient.save();
        res.status(200).json("registered the patient");
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    res.status(403).json({
      error: "token expired",
    });
  }
});
patientRouter.post("/:id/create_report", checkToken, async (req, res) => {
  const params = req.params.id;
  const { status, id } = verifier(req.token);
  if (status) {
    try {
      await Patient.findById(params)
        .then(async () => {
          const newReport = new Report({
            patientId: params,
            doctorId: id,
            status: req.body.status,
          });
          const report = await newReport.save();
          res.status(200).json(report);
          return;
        })
        .catch((e) => {
          res.status(404).json("patient not found");
          return;
        });
    } catch (error) {
      console.log(error);
      return;
    }
  } else {
    res.status(403).json({
      error: "token expired",
    });
  }
});
patientRouter.get("/:id/all_reports", checkToken, async (req, res) => {
  const { status, id } = verifier(req.token);
  if (status) {
    Report.find({ patientId: req.params.id })
      .then((response) => {
        res.status(200).json(response);
        return;
      })
      .catch((e) => {
        res.status(400).json("user details are not found");
        console.log(e);
        return;
      });
  } else {
    res.status(404).json("session key expired re login");
  }
});

module.exports = patientRouter;
