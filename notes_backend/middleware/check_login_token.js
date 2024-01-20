const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    // decodificando token
    const decoded = jwt.verify(token, process.env.DASHBOARD_JWT_SECRET_LOGIN);
    req.userData = decoded;
    
    next(); // si pasamos la autenticacion
  } catch (error) {
    console.log(`Auth failed, ${error.name}`, error)
    return res.status(401).json({
      message: `Auth failed - Unauthorized`
    });
  }
};