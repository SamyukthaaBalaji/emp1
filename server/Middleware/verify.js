const jwt = require('jsonwebtoken');
require("dotenv").config();
module.exports=(req, res, next) => {
    const token = req.headers.token;
    console.log(token);
    if (!token) {
      return res.status(401).json({ message: "Access denied. Token required." });
    }
  
    jwt.verify(token, process.env.jwtSecret, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Invalid token" });
      }
      
      req.userId = decoded.user;
      next();
    });
  };
  