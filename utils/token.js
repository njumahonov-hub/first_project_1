const jwt = require("jsonwebtoken")

const tokengenerator = (payload) => {
    return jwt.sign(payload, process.env.SECRET_KEY, {expiresIn:"15m"})
}

module.exports = tokengenerator