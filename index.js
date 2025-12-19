const express = require("express")
const cors = require("cors")
const connectDB = require("./config/db.config")
const authorRoutes = require("./routes/auth.routes")
const bookRoutes = require("./routes/book.routes")
require("dotenv").config()


const app = express()

const PORT = process.env.PORT || 3000
app.use(cors({origin: true, credentials: true}))
app.use(express.json())


connectDB()

// router
app.use(authorRoutes)
app.use(bookRoutes)

app.listen(PORT, () => {
    console.log("server is running:", PORT);
    
})