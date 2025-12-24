const joi = require("joi")


exports.AuthorValidator = function(data) {
    try {
        
       const schema = joi.object({
        full_name: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        birth_year: joi.number().integer().required(),
        death_year: joi.string().required(),
        image_url: joi.string().max(25).required(),
        bio: joi.string().max(100).required(),
        creativity: joi.string().max(1000).required(),
        genre: joi.string().valid("Historical", "Drama", "Horror", "Romance", "Detective", "Documentary", "Science fiction").required(),
        period: joi.string().valid("Temuriylar davri", "Jadid adabiyoti", "Sovet davri", "Mustaqillik davri"),
        region: joi.string().max(50).required()

       })

    return schema.validate(data)
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

