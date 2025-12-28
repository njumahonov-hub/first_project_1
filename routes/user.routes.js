const {Router} = require("express")
const { registr, login, resendOtp, forgotPassword } = require("../controller/user.controller")
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
userRoutes.post("/resend", resendOtp)
userRoutes.post("/forgot_password", forgotPassword)

module.exports = userRoutes