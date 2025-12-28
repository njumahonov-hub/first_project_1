
const {Schema, model} = require("mongoose")


const citation =  new Schema({
    text : {
        type: String
    },
    book_id: {
        type: Schema.ObjectId,
        ref: "Book",
        required: true
    },
     admin_id: {
        type: Schema.ObjectId,
        ref: "User",
        required: true
    }
},
{
    versionKey: false,
    timestamps: true
})

const citationSchema = model("citiation", citation)

module.exports = citationSchema


