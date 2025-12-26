const {Router} = require("express")
const { registr, login } = require("../controller/user.controller")
const { verify } = require("../controller/user.controller")
const refreshToken = require("../middleware/refresh-token")
const { logout } = require("../controller/user.controller")
const userValidatorMiddleware = require("../middleware/user-validator.middleware")

const userRoutes = Router()

userRoutes.post("/register", userValidatorMiddleware, registr)
userRoutes.post("/verify", verify)
userRoutes.post("/login", login)
userRoutes.get("/refresh",  refreshToken)
userRoutes.get("/logout", logout)

module.exports = userRoutes