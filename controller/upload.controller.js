const uploadfile = async (req , res ) => {
    return res.status(201).json({
         filePath: `http://localhost:4001/images/${req.file.filename}`
    })
}

module.exports = {
    uploadfile
}