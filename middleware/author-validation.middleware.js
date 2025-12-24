const CustomErrorHandle = require("../utils/custom-errorhandle")
const { AuthorValidator } = require("../validator/author.validator")

module.exports = function(req, res, next){
    const {error} = AuthorValidator(req.body)

    if(error){
      throw CustomErrorHandle.BadRequest(error.message)
    }

    next()
}