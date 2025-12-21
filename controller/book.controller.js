const bookSchema = require("../schema/book.schema")


const getallBooks= async (req, res ) => {
    try{
        const books = await bookSchema.find().populate("author_id", "-_id")  
    //  select("-_id").skip(1).limit(2)
        res.status(200).json(books)

    } catch (error) {
        console.log(error.message)
    }
}

const addBooks= async (req, res ) => {
    try{
     const {title,pages, published_year,image_url, description, genre,period , published_home, author_id} = req.body

     await bookSchema.create({title,pages, published_year,image_url, description, genre,period , published_home, author_id})

    res.status(201).json({
        message: "Added book"
    })
    } catch (error) {
        console.log(error.message)
    }
}
const getoneBook = async (req, res ) => {
    try{
        const {id} = req.params
        const Book = await bookSchema.findById(id)

        if(!Book){
            return res.status(404).json({
                message: "Book not found!"
            })
        }

        
        res.status(200).json(Book)

    } catch (error) {
        console.log(error.message)
    }
}
const updatebook = async (req, res ) => {
    try{
        const {id} = req.params
         const {title,pages, published_year,image_url, description, genre,period , published_home, author_id } = req.body
        const book = await bookSchema.findById(id)

        if(!book){
            return res.status(404).json({
                message: "Book not found!"
            })
        }

        await bookSchema.findByIdAndUpdate(id, { title,pages, published_year,image_url, description, genre,period , published_home, author_id} )

        res.status(200).json({
            message: "Succesful update!"
        })

    } catch (error) {
        console.log(error.message)
    }
}
const deletebook = async (req, res ) => {
    try{
        const {id} = req.params
      
        const book = await bookSchema.findById(id)

        if(!book){
            return res.status(404).json({
                message: "Book not found!"
            })
        }

        await bookSchema.findByIdAndDelete(id)

        res.status(200).json({
            message: "Succesful deleted!"
        })

    } catch (error) {
        console.log(error.message)
    }
}


module.exports = {
    getallBooks,
    addBooks,
    getoneBook,
    updatebook,
    deletebook
}