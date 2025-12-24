const jwt = require("jsonwebtoken")
const CustomErrorHandle = require("../utils/custom-errorhandle")

const Authorizaton = async (req, res, next) => {
    try {
    const bearerToken = req.headers.authorization

     if(!bearerToken){
        throw CustomErrorHandle.UnAuhtorized("Bearer token not found!")
     }

     const token = bearerToken.split(" ")

     if(token[0] !== "Bearer") {
        throw CustomErrorHandle.UnAuhtorized("Bearer not found!")
     }

     if(!token[1]){
         throw CustomErrorHandle.UnAuhtorized("Token not found!")
     }


     const decode = jwt.verify(token[1], process.env.SECRET_KEY)
      req.user = decode
      
      next()
    } catch (error) {
      next(error)
    }
}

module.exports = {
    Authorizaton
}