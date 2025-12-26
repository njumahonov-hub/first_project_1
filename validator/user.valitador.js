const joi = require("joi")


exports.UserValidator = function(data) {
    try {
        
       const schema = joi.object({
        username: joi.string().pattern(new RegExp('^[a-zA-Z0-9]$')).required(),
        email: joi.string().required(),
        password: joi.string().required(),
        role: joi.string().required(),
        otp: joi.string().required(),
        isVerified: joi.string().required(),
        otpTime: joi.string().required(),
    

       })

    return schema.validate(data)
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

