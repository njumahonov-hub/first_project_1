const {Schema, model} = require("mongoose")


const book = new Schema({
title: {
    type: String,
    required: true
},
pages: {
    type: Number,
    required: true
},
published_year: {
    type: String,
    required: false,
    default: null
},
image_url: {
    type: String,
    required: true
},
description: {
    type: String,
    required: true
},
genre: {
    type: String,
    required: true
},
period: {
    type: String,
    required: true
},
published_home: {
    type: String,
    required: true
}

},
{
    versionKey: false,
    timestamps: true
})


const bookSchema = model("Book", book)

module.exports = bookSchema