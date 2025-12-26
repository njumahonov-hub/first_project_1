const CustomErrorHandle = require("../utils/custom-errorhandle")
const { UserValidator } = require("../validator/user.valitador")


module.exports = function(req, res, next){
    const {error} = UserValidator(req.body)

    if(error){
      throw CustomErrorHandle.BadRequest(error.message)
    }

    next()
}