const docRouter = require("express").Router();
const Doctor = require("../model/Doctor");
const jwt = require("jsonwebtoken");
const { secretKey } = require("./Auth/Auth");
const bcrypt = require("bcrypt");
docRouter.get("/", async (req, res) => {
  const doc = await Doctor.find();
  res.json(doc);
});
docRouter.post("/register", async (req, res) => {
  try {
    const checkDoctor = await Doctor.findOne({
      email: req.body.email,
    });
    if (checkDoctor != null) {
      res.status(404).json("accout already exists! try login");
      return;
    } else {
      const hashPwd = await bcrypt.hash(req.body.password, 10); // 10 salt rounds
      const newDoctor = new Doctor({
        name: req.body.name,
        email: req.body.email,
        password: hashPwd,
      });
      const doctor = await newDoctor.save();
      res.status(200).json(doctor);
      return;
    }
  } catch (error) {
    console.log(error);
  }
});
docRouter.post("/login", async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ email: req.body.email });
    if (doctor === null) {
      res.status(404).json("User not exist! please register");
      return;
    } else {
      const match = await bcrypt.compare(req.body.password, doctor.password);
      if (match) {
        // JWT sign in and generate the token
        jwt.sign({ doctor }, secretKey, { expiresIn: "1h" }, (err, token) => {
          if (err) {
            console.log(err);
          }
          res.status(200).json({
            Token: token,
          });
        });
      } else {
        res.status(409).json({ message: "password not match" });
      }
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = docRouter;
