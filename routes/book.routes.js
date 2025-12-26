const {Router} = require("express")
const { getallBooks, addBooks, getoneBook, updatebook, deletebook } = require("../controller/book.controller")
const bookValidatorMiddleware = require("../middleware/book-validator.middleware")

const auhtorization = require("../middleware/auhtorization")



const bookRoutes = Router()

bookRoutes.get("/get_all_books", getallBooks)
bookRoutes.post("/add_books",   bookValidatorMiddleware, auhtorization, addBooks)
bookRoutes.get("/get_one_book/:id",  getoneBook)
bookRoutes.put("/update_book/:id",  auhtorization,  updatebook)
bookRoutes.delete("/delete_book/:id",    auhtorization, deletebook)

module.exports = bookRoutes 
