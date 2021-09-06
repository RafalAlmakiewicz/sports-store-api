jwt = require("jsonwebtoken");

const authorize = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token || token == "null") {
    return res.status(401).send("Accesss denied. No token provided.");
  }

  try {
    const decoded = jwt.verify(token, "jwtPrivateKey");
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send("Invalid token");
  }
};

module.exports = authorize;
