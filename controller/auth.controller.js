const AuthorSchema = require("../schema/author.schema")
const bookSchema = require("../schema/book.schema")

const getallAuthors = async (req, res ) => {
    try{
        const authors = await AuthorSchema.find()

        res.status(200).json(authors)

    } catch (error) {
        console.log(error.message)
    }
}

const search = async (req, res ) => {
    try{
        const {name} = req.query
        const searchingresult = await AuthorSchema.find({
            full_name:{$regex:name, $options: "i"}
        })

        res.status(200).json(searchingresult)

    } catch (error) {
        console.log(error.message)
    }
}

const addAuthors = async (req, res ) => {
    try{
     const { full_name, birth_year,death_year, image_url, bio, creativity,period, genre, region} = req.body

     await AuthorSchema.create({full_name, birth_year,death_year, image_url, bio, creativity,period, genre, region})

    res.status(201).json({
        message: "Added author"
    })
    } catch (error) {
        console.log(error.message)
    }
}
const getoneAuthor = async (req, res ) => {
    try{
        const {id} = req.params
        const author = await AuthorSchema.findById(id)

        if(!author){
            return res.status(404).json({
                message: "Author not found!"
            })
        }

        const foundedbook = await bookSchema.find({author_id: id})

        res.status(200).json({author, foundedbook})

    } catch (error) {
        console.log(error.message)
    }
}
const updateAuthor = async (req, res ) => {
    try{
        const {id} = req.params
         const { full_name, birth_year,death_year, image_url, bio, creativity,period, genre, region} = req.body
        const author = await AuthorSchema.findById(id)

        if(!author){
            return res.status(404).json({
                message: "Author not found!"
            })
        }

        await AuthorSchema.findByIdAndUpdate(id, { full_name, birth_year,death_year, image_url, bio, creativity,period, genre, region} )

        res.status(200).json({
            message: "Succesful update!"
        })

    } catch (error) {
        console.log(error.message)
    }
}
const deleteAuthor = async (req, res ) => {
    try{
        const {id} = req.params
      
        const author = await AuthorSchema.findById(id)

        if(!author){
            return res.status(404).json({
                message: "Author not found!"
            })
        }

        await AuthorSchema.findByIdAndDelete(id)

        res.status(200).json({
            message: "Succesful deleted!"
        })

    } catch (error) {
        console.log(error.message)
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