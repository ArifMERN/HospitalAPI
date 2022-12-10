const reportRouter = require("express").Router();
const Report = require("../model/Reports");
const { checkToken, verifier } = require("./Auth/Auth");
reportRouter.get("/:status", checkToken, async (req, res) => {
  const { status, id } = verifier(req.token);
  if (status) {
    await Report.find({ status: req.params.status })
      .then((response) => {
        res.status(200).json(response);
        return;
      })
      .catch(() => {
        res.status(404).json("looks like no reports found");
        return;
      });
  } else {
    res.status(404).json("session is expired relogin");
  }
});

module.exports = reportRouter;
