const jwt = require("jsonwebtoken");
const secretKey = "jrowejQWQoo12$"; // add your own secret key

const checkToken = (req, res, next) => {
  const headers = req.headers["authorization"];
  if (typeof headers !== "undefined") {
    const bearer = headers.split(" ");
    const token = bearer[1];

    req.token = token;

    next();
  } else {
    //If header is undefined return Forbidden (403)
    res.sendStatus(403);
  }
};
const verifier = (token) => {
  let status = true;
  let id = "null";
  jwt.verify(token, secretKey, (err, auth) => {
    if (err) {
      //If error send Forbidden (403)
      status = false;
    } else {
      //If token is successfully verified, we can send the autorized data
      id = auth.doctor._id;
      status = true;
    }
  });
  return { status, id };
};

module.exports = { secretKey, checkToken, verifier };
