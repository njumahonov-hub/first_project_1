const bookSchema = require("../schema/book.schema")
const citationSchema = require("../schema/citiation.schema")
const CustomErrorHandle = require("../utils/custom-errorhandle")


const getallBooks= async (req, res, next ) => {
    try{
        const books = await bookSchema.find().populate("author_id", "-_id")  
    //  select("-_id").skip(1).limit(2)
        res.status(200).json(books)

    } catch (error) {
     next(error)
    }
}

const addBooks= async (req, res, next ) => {
    try{
     const {title,pages, published_year,image_url, description, genre,period , published_home, author_id} = req.body

     await bookSchema.create({title,pages, published_year,image_url, description, genre,period , published_home, author_id})

    res.status(201).json({
        message: "Added book"
    })
    } catch (error) {
       next(error)
    }
}
const getoneBook = async (req, res, next  ) => {
    try{
        const {id} = req.params
        const Book = await bookSchema.findById(id)

        if(!Book){
        throw CustomErrorHandle.NotFound("book not found!")
        }

        const foundedcitation = await citationSchema.find({book_id:id })
        res.status(200).json({Book, foundedcitation})

    } catch (error) {
        next(error)
    }
}
const updatebook = async (req, res, next) => {
    try{
        const {id} = req.params
         const {title,pages, published_year,image_url, description, genre,period , published_home, author_id } = req.body
        const book = await bookSchema.findById(id)

        if(!book){
           throw CustomErrorHandle.NotFound("book not found!")
        }

        await bookSchema.findByIdAndUpdate(id, { title,pages, published_year,image_url, description, genre,period , published_home, author_id} )

        res.status(200).json({
            message: "Succesful update!"
        })

    } catch (error) {
        next(error)
    }
}
const deletebook = async (req, res, next ) => {
    try{
        const {id} = req.params
      
        const book = await bookSchema.findById(id)

        if(!book){
           throw CustomErrorHandle.NotFound("book not found!")
        }

        await bookSchema.findByIdAndDelete(id)

        res.status(200).json({
            message: "Succesful deleted!"
        })

    } catch (error) {
       next(error)
    }
}


module.exports = {
    getallBooks,
    addBooks,
    getoneBook,
    updatebook,
    deletebook
}