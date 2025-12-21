const {Schema, model} = require("mongoose")


const book = new Schema({
title: {
    type: String,
    required: true,
    set: value => value.trim(),
    minLength: [3, "3ta dan kam harf yozib bo'lmaydi"]
},
pages: {
    type: Number,
    required: true
},
published_year: {
    type: String,
    required: false,
    default: null,
    max: new Date().getFullYear()
},
image_url: {
    type: String,
    required: true,
    minLength: [15, "kamida 15da harf bolishi kerak"]
},
description: {
    type: String,
    required: true,
    maxLength: [100, "100 harfdan ko'p yozib bo'lmaydi"],
    set: value => value.trim()
},
genre: {
    type: String,
    required: true,
       enum:{
        values: ["Historical", "Drama", "Horror", "Romance", "Detective", "Documentary", "Science fiction"],
        message: `{VALUE} bunday qiymat qabul qilinmayadi`
    }
},
period: {
    type: String,
    required: true,
    enum:{
        values: ["Temuriylar davri", "Jadid adabiyoti", "Sovet davri", "Mustaqillik davri"],
        message: `{VALUE} bunday qiymat qabul qilinmayadi`
    }
},
published_home: {
    type: String,
    required: true,
    set: value => value.trim(),
    maxLength: [100, "100 ta harfdan ko'p bo'lmaydi"]
},
author_id:{
    type: Schema.ObjectId,
    ref: "Author",
    required: true
}

},
{
    versionKey: false,
    timestamps: true
})


const bookSchema = model("Book", book)

module.exports = bookSchema