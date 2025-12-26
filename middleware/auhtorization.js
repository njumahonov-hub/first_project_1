const jwt = require("jsonwebtoken")
const CustomErrorHandle = require("../utils/custom-errorhandle")

module.exports = function (req, res, next)  {
    try {
    const accesstoken =  req.cookies.access_token

     if(!accesstoken){
        throw CustomErrorHandle.UnAuhtorized("Access token not found!")
     }
     const decode = jwt.verify(accesstoken, process.env.SECRET_KEY)
      req.user = decode
      

      if(!["superadmin", "admin"].includes(req.user.role)){
        throw CustomErrorHandle.Forbidden("You are not admin or superadmin")
      }

      next()
    } catch (error) {
      next(error)
    }
}

