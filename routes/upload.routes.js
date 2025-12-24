const {Router} = require("express")
const upload = require("../utils/multer")
const { uploadfile } = require("../controller/upload.controller")

const uploadrouter = Router()

uploadrouter.post("/upload", upload.single("file"), uploadfile)

module.exports = uploadrouter