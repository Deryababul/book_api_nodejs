const express = require('express');
const app = express();
const db = require("../config/db");

app.use(express.json());

const getAllBooks = async (req, res) => {
    try {
        const sql ='SELECT * FROM books';
        const books = await db.query(sql);
        if(!books.length){
            return res.status(404).json({
                success:false,
                message: 'No records found',
            });
        }

        return res.status(200).json({
            success:true,
            message:'All book records',
            data: books[0]
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
        });
    }
    
}
const addBook = async(req,res) =>{
    try {
        const { title, author, isbn, price } = req.body;

        if(!title || !author || !isbn || !price){
            return res.status(400).json({
                success: false,
                message: 'Please provide all fields'
            });
        }
        const sql = `INSERT INTO books (title, author, isbn, price) VALUES (?, ?, ?, ?)`;
        const books = await db.query(sql, [title, author, isbn, price]);

        if(!books){
            return res.status(500).json({
                success: false,
                message:'Error executing INSERT query'
            });
        }
        return res.status(201).json({
            success: true,
            message: 'Book added successfully',
        });
    } catch (error) {
        console.error('Error creating book:', error.message);
        res.status(500).json({
            success: false,
            message:'Error Creating Book',
        });
    }
}
const getBookById = async(req,res) => {
    try {
        const bookId = req.params.id;
        if(!bookId){
            return res.status(400).json({
                success:false,
                message:'Invalid book Id'
            });
        }
        const sql = 'SELECT * FROM books WHERE id = ?';
        const [book] = await db.query(sql, [bookId]);
        if(book.length === 0){
            return res.status(404).json({
                success: false,
                message:'Book not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Book details',
            data: book[0],
        });

        
    } catch (error) {
        console.error('Error fetching book by ID:', error.message);
        res.status(500).json({
            success:false,
            message:'Error fetching book by ID',
        });
    }
}
const updateBook = async (req,res) => {
    try {
        const bookId = req.params.id;
        const { title, author, isbn, price} = req.body;
        if (!title || !author || !isbn || !price) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all book details',
            });
        }
        if(!bookId){
            return res.status(400).json({
                success: false,
                message: 'Invalid book ID',
            });
        }
        const sql = `UPDATE books SET title = ?, author = ?, isbn = ?, price = ? WHERE id = ?`;
        const book = await db.query(sql, [title, author, isbn, price, bookId]);
        if (!book || book[0].affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Book not found or no changes made',
            });
        }
        res.status(200).json({
            success: true,
            message: 'Book updated successfully',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating book',
        })
    }
}
const deleteBook = async (req,res) => {
    try {
        const bookId = req.params.id;
        if(!bookId){
            return res.status(400).json({
                success: false,
                message:'Invalid book ID',
            })
        }
        const sql = 'DELETE FROM books WHERE id = ?';
        const book = await db.query(sql, [bookId]);
        if (!book || book[0].affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Book not found',
            });
        }
        res.status(200).json({
            success: true,
            message:'Book Deleted Successfully'
        })
    } catch (error) {
        // console.error('Error deleting book:', error.message);
        res.status(500).json({
            success:false,
            message:'Error deleting book',
        })
    }
}


module.exports = {
    getAllBooks,
    getBookById,
    addBook,
    updateBook,
    deleteBook
}