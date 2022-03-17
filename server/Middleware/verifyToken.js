const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SEC_KEY, (err, user) => {
      if (err) res.status(403).send("invalid token!");
      req.user = user;
      next();
    });
  } else {
    return res.status(401).send("You are not authenticated!");
  }
};

const verifyTokenAndAuth = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      //!checking if the users id is the same us the id passed as param or if the user trying to edit is an Admin

      next();
    } else {
      return res.status(403).send("you are not allowed!");
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not authorised to perform this action!");
    }
  });
};
module.exports = {verifyToken, verifyTokenAndAuth, verifyTokenAndAdmin};
