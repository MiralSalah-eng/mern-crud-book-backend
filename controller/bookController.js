const mongoose = require('mongoose')
const Book = require('../models/bookModel')

// handle errors
const handleErrors = (err) => {
  let errors = { author: '', title: '' , description :'', pages:''};

  // validation errors
  if (err.message.includes('Book validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
}

// Get all Books 
const getBooks = async (req, res) => {
  const user_id = req.user._id


      try {
        const books = await Book.find({user_id}).sort({'updatedAt':-1})
        res.status(201).json(books)
      } catch (error) {
        res.status(400).json({error: error.message})
  
      }
  }
  
  // Get single Book 
  const getSingleBook = async (req, res) => {

    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "NO Such Book With This Id (not valid)"}) // here id not valid so can not found
    }

    const book = await Book.find({_id:id})

    if(!book){
       return res.status(404).json({error: "NO Such Book With This Id"}) // here id is valid but not found
    }

    res.status(200).json(book)

    }

// Create New Book 
const createBook = async (req, res) => {
  const user_id = req.user._id
    const {author,title,description,pages} = req.body;
    
      try {
        const book = await Book.create({author,title,description,pages,user_id})
        res.status(200).json(book)
      } catch (error) {
        const errors = handleErrors(error);
        res.status(400).json({ errors });
  
      }
  }

    // Get single Book 
    const deleteSingleBook = async (req, res) => {
        const {id} = req.params
    
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({error: "NO Such Book With This Id (not valid)"}) // here id not valid so can not found
        }
    
        const book = await Book.findByIdAndDelete({_id:id})
        if(!book){
           return res.status(404).json({error: "NO Such Book With This Id"}) // here id is valid but not found
        }
    
        res.status(200).json(book)
    
    }
    
    const updateSingleBook = async (req, res) => {
        const {id} = req.params
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({error: "NO Such Book With This Id (not valid)"}) // here id not valid so can not found
        }
    
        const book = await Book.findByIdAndUpdate({_id:id}, {...req.body},{new: true})

        if(!book){
           return res.status(404).json({error: "NO Such Book With This Id"}) // here id is valid but not found
        }
    
        res.status(200).json(book)
    
    }


  module.exports = {
    createBook,
    getBooks,
    getSingleBook,
    deleteSingleBook,
    updateSingleBook
  }