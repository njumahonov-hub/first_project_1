const AuthorSchema = require("../schema/author.schema")
const bookSchema = require("../schema/book.schema")
const CustomErrorHandle = require("../utils/custom-errorhandle")

const getallAuthors = async (req, res , next) => {
    try{
        const authors = await AuthorSchema.find()

        res.status(200).json(authors)

    } catch (error) {
        next(error)
    }
}

const search = async (req, res, next ) => {
    try{
        const {name} = req.query
        const searchingresult = await AuthorSchema.find({
            full_name:{$regex:name, $options: "i"}
        })

        res.status(200).json(searchingresult)

    } catch (error) {
        next(error)
    }
}

const addAuthors = async (req, res, next ) => {
    try{
     const { full_name, birth_year,death_year, image_url, bio, creativity,period, genre, region} = req.body

     await AuthorSchema.create({full_name, birth_year,death_year, image_url, bio, creativity,period, genre, region})

    res.status(201).json({
        message: "Added author"
    })
    } catch (error) {
      next(error)
    }
}
const getoneAuthor = async (req, res, next ) => {
    try{
        const {id} = req.params
        const author = await AuthorSchema.findById(id)

        if(!author){
           
            
        throw CustomErrorHandle.NotFound("Author not found!")
        }

        const foundedbook = await bookSchema.find({author_id: id})

        res.status(200).json({author, foundedbook})

    } catch (error) {
        next(error)
    }
}
const updateAuthor = async (req, res, next ) => {
    try{
        const {id} = req.params
         const { full_name, birth_year,death_year, image_url, bio, creativity,period, genre, region} = req.body
        const author = await AuthorSchema.findById(id)

        if(!author){
            throw CustomErrorHandle.NotFound("Author not found!")
        }

        await AuthorSchema.findByIdAndUpdate(id, { full_name, birth_year,death_year, image_url, bio, creativity,period, genre, region} )

        res.status(200).json({
            message: "Succesful update!"
        })

    } catch (error) {
       next(error)
    }
}
const deleteAuthor = async (req, res, next ) => {
    try{
        const {id} = req.params
      
        const author = await AuthorSchema.findById(id)

        if(!author){
            throw CustomErrorHandle.NotFound("Author not found!")
        }

        await AuthorSchema.findByIdAndDelete(id)

        res.status(200).json({
            message: "Succesful deleted!"
        })

    } catch (error) {
     next(error)
    }
}


module.exports = {
    getallAuthors,
    addAuthors,
    getoneAuthor,
    updateAuthor,
    deleteAuthor,
    search
}