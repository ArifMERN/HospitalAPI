const docRouter = require("express").Router();
const Doctor = require("../model/Doctor");

const jwt = require("jsonwebtoken");
const { secretKey } = require("./Auth/Auth");

docRouter.post("/register", async (req, res) => {
  try {
    const checkDoctor = await Doctor.findOne({
      email: req.body.email,
    });
    if (checkDoctor != null) {
      res.status(404).json("accout already exists! try login");
      return;
    } else {
      // const hashPassword = await passwordHash.generate(req.body.password);
      const newDoctor = new Doctor({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
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
    console.log(req.body);
    const doctor = await Doctor.findOne({ email: req.body.email });
    if (doctor === null) {
      res.status(404).json("User not exist! please register");
      return;
    } else {
      if (req.body.password !== doctor.password) {
        res.status(400).json("password not match!");
        return;
      }
      jwt.sign({ doctor }, secretKey, { expiresIn: "1h" }, (err, token) => {
        if (err) {
          console.log(err);
        }

        res.status(200).json({
          Token: token,
          user: doctor,
        });
      });
    }
  } catch (error) {
    console.log(error);
  }
});
const checkToken = (req, res, next) => {
  const header = req.headers["authorization"];

  if (typeof header !== "undefined") {
    const bearer = header.split(" ");
    const token = bearer[1];

    req.token = token;

    next();
  } else {
    //If header is undefined return Forbidden (403)
    res.sendStatus(403);
  }
};

module.exports = docRouter;
