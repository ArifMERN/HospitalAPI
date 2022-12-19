const reportRouter = require("express").Router();
const Report = require("../model/Reports");
const { checkToken, verifier } = require("./Auth/Auth");
reportRouter.get("/:status", checkToken, async (req, res) => {
  const { status, id } = verifier(req.token);

  if (status) {
    const report = await Report.find({ status: req.params.status })
      .populate("patientId")
      .populate("doctorId");

    res.status(200).json(report);
  } else {
    res.status(404).json("session is expired relogin");
  }
});

module.exports = reportRouter;
