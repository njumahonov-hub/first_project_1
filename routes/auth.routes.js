const {Router} = require("express")
const { getallAuthors, addAuthors, getoneAuthor, updateAuthor, deleteAuthor, search } = require("../controller/auth.controller")
const authorValidationMiddleware = require("../middleware/author-validation.middleware")
const { Authorizaton } = require("../middleware/auhtorization")


const authorRoutes = Router()

authorRoutes.get("/get_all_authors", getallAuthors)
authorRoutes.get("/search", search)
authorRoutes.post("/add_auhtors", Authorizaton , authorValidationMiddleware, addAuthors)
authorRoutes.get("/get_one_author/:id", Authorizaton , getoneAuthor)
authorRoutes.put("/update_author/:id",  Authorizaton , updateAuthor)
authorRoutes.delete("/delete_author/:id",  Authorizaton ,  deleteAuthor)

module.exports = authorRoutes 
