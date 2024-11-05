const jwt = require("jsonwebtoken")
const { JWT_Secret } = require('../config')
const { User } = require('../db/index')

async function userMiddleware(req, res, next) {
  const token = req.headers.authorization;
  if (!token || !token.startsWith('Bearer ')) {
    return res.status(403).json({
      msg: "Invalid token"
    });
}

  const words = token.split(" ")
  const jwtToken = words[1]
  try {
    const decodeValue = jwt.verify(jwtToken, JWT_Secret);
    if(decodeValue)
    {
      req.userId = decodeValue.userId;
      next();
    }
    else {
      res.status(404).json({
        msg: "Your token verify failed"
      })
      return;
    }
  } catch(e) {
    res.sendStatus(404)
  }
}

module.exports = userMiddleware;