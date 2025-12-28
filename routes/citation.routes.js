const {Router} = require("express")

const auhtorization = require("../middleware/auhtorization")
const { addcitation, updatecitation, deletecitation } = require("../controller/citation.controller")


const citationRoutes = Router()


citationRoutes.post("/add_citation", addcitation)
citationRoutes.put("/update_book/:id",   updatecitation)
citationRoutes.delete("/delete_book/:id",   deletecitation)

module.exports = citationRoutes 
