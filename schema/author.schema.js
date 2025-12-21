const {Schema, model} = require("mongoose")


const Author = new Schema({
full_name: {
    type: String,
    required: true,
    unique: [false, "Ism familya unique bo'lishi kerak"],
    set: value => value.trim(),
    minLength: [3, "kamida 3 ta harf bo'lishi kerak"],
    match: [/^[a-zA-Z]+$/,  "faqat harf kiriting"]
},
birth_year: {
    type: Number,
    required: true,
    max: [new Date().getFullYear() - 15, "bunday yil kirita ilmaysiz" ],
    min: 0
},
death_year: {
    type: String,
    required: false,
    default: null,
    max: new Date().getFullYear()
    
},
image_url: {
    type: String,
    required: true,
    minLength: [15, "kamida 15 ta harfdan iborat bo'lsin"]
},
bio: {
    type: String,
    required: true,
    maxLength: 10000
},
creativity: {
    type: String,
    required: true,
    maxLength: 1000
},
genre: {
    type: String,
    required: true,
    toLowerCase: true,
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
region: {
    type: String,
    required: true
},
// phone_number: {
//     type: String,
//     required: true,
//     validate: {
//         validator: function(value) {
//             return /^\+998\d{2} d{3} d{2} d{2}/
//         },
//         message: "telefon raqam formati +99890 000 00 00 bunday bo'lishi kerak"
//     }
// },
},
{
    versionKey: false,
    timestamps: true
})


const AuthorSchema = model("Author", Author)

module.exports = AuthorSchema