const {Router} = require("express")
const { getallAuthors, addAuthors, getoneAuthor, updateAuthor, deleteAuthor, search } = require("../controller/auth.controller")


const authorRoutes = Router()

authorRoutes.get("/get_all_authors", getallAuthors)
authorRoutes.get("/search", search)
authorRoutes.post("/add_auhtors", addAuthors)
authorRoutes.get("/get_one_author/:id", getoneAuthor)
authorRoutes.put("/update_author/:id", updateAuthor)
authorRoutes.delete("/delete_author/:id",  deleteAuthor)

module.exports = authorRoutes 
