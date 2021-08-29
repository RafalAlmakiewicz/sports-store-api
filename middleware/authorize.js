jwt = require("jsonwebtoken");

const authorize = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("Accesss denied. No token provided.");

  try {
    const decoded = jwt.verify(token, "jwtPrivateKey");
    req.user = decoded;
    console.log(req.params.id);
    console.log(req.params);
    console.log(req.body, "end of auth func");
    next();
  } catch (ex) {
    res.status(400).send("Invalid token");
  }
};

module.exports = authorize;
