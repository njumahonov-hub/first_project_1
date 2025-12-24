const joi = require("joi")


exports.BookValidator = function(data) {
    try {
        
       const schema = joi.object({
        title: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{2,30}$')).required(),
        pages: joi.number().integer().required(),
        published_year: joi.string().max(new Date().getFullYear()).required(),
        image_url: joi.string().min(15).required(),
        description: joi.string().max(100).required(),
        published_home: joi.string().max(100).required(),
        genre: joi.string().valid("Historical", "Drama", "Horror", "Romance", "Detective", "Documentary", "Science fiction").required(),
        period: joi.string().valid("Temuriylar davri", "Jadid adabiyoti", "Sovet davri", "Mustaqillik davri"),
        author_id: joi.string().max(24).required()

       })

    return schema.validate(data)
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

