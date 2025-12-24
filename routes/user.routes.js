const {Router} = require("express")
const { registr, login } = require("../controller/user.controller")

const userRoutes = Router()

userRoutes.post("/register", registr)
userRoutes.post("/login", login)

module.exports = userRoutes