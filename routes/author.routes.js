const {Router} = require("express")
const { getallAuthors, addAuthors, getoneAuthor, updateAuthor, deleteAuthor, search } = require("../controller/author.controller")
const authorValidationMiddleware = require("../middleware/author-validation.middleware")
const auhtorization = require("../middleware/auhtorization")



const authorRoutes = Router()

authorRoutes.get("/get_all_authors", getallAuthors)
authorRoutes.get("/search", search)
authorRoutes.post("/add_auhtors",   authorValidationMiddleware, auhtorization, addAuthors)
authorRoutes.get("/get_one_author/:id", auhtorization , getoneAuthor)
authorRoutes.put("/update_author/:id",  auhtorization , updateAuthor)
authorRoutes.delete("/delete_author/:id",  auhtorization ,  deleteAuthor)

module.exports = authorRoutes 
