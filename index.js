const express = require("express")
const cors = require("cors")
const connectDB = require("./config/db.config")
const authorRoutes = require("./routes/auth.routes")
const bookRoutes = require("./routes/book.routes")
const uploadrouter = require("./routes/upload.routes")
const errorMiddleware = require("./middleware/error.middleware")
const userRoutes = require("./routes/user.routes")
require("dotenv").config()


const app = express()

const PORT = process.env.PORT || 3000
app.use(cors({origin: true, credentials: true}))
app.use(express.json())


connectDB()


app.use("/images", express.static("upload/images"))


// router
app.use(authorRoutes)
app.use(bookRoutes)
app.use(uploadrouter)
app.use(userRoutes)

app.use(errorMiddleware)

app.listen(PORT, () => {
    console.log("server is running:", PORT);
    
})