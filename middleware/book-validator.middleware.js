const CustomErrorHandle = require("../utils/custom-errorhandle")
const { BookValidator } = require("../validator/bookv.validator")

module.exports = function(req, res, next){
    const {error} = BookValidator(req.body)

    if(error){
      throw CustomErrorHandle.BadRequest(error.message)
    }

    next()
}