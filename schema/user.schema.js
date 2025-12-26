const { required } = require("joi");
const { Schema, model } = require("mongoose");
const { validate } = require("./book.schema");

const user = new Schema(
  {
    username: {
      type: String,
      required: true,
      set: (value) => value.trim(),
      unique: [true, "Bunaday username avval kiritilgan"],
      match: [/^[a-zA-Z0-9_]+$/, "faqat harf kiriting"],
    },
    email: {
      type: String,
      required: [true, "Email majburiy"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^\S+@\S+\.\S+$/,
        "Email noto‘g‘ri formatda (masalan: test@gmail.com)",
      ],
    },

    password: {
      type: String,
      required: true,
      minlength: [8, "Parol kamida 8 ta belgidan iborat bo‘lishi kerak"],
    },
    role: {
      type: String,
      set: value => value.toLowerCase(),
      enum: {
        values: ["superadmin", "admin", "user"],
        message: `{VALUE} bunday qiymat qabul qilinmaydi`
      },
      default: "user"
    },
    otp: {
      type: String,
      default: null
    },
     isVerified: {
      type: Boolean,
      default: false
    },
    otpTime: {
      type: Number,
      default: null
    }
    
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const UserSchema = model("User", user);

module.exports = UserSchema;
