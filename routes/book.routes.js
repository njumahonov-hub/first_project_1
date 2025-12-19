const {Router} = require("express")
const { getallBooks, addBooks, getoneBook, updatebook, deletebook } = require("../controller/book.controller")


const bookRoutes = Router()

bookRoutes.get("/get_all_books", getallBooks)
bookRoutes.post("/add_books", addBooks)
bookRoutes.get("/get_one_book/:id", getoneBook)
bookRoutes.put("/update_book/:id", updatebook)
bookRoutes.delete("/delete_book/:id",  deletebook)

module.exports = bookRoutes 
