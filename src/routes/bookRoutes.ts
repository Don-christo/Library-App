import express, {Request, Response, NextFunction} from "express";
import { createBook, deleteBook, getAllBooks, getBookInfo, updateAnyBook, getByPage } from '../controllers/bookControllers';
import { authMiddleware } from '../middlewares/authMiddleware';
const router = express.Router();

router.post('/create',authMiddleware, createBook); //create a new book and add to database
router.get('/getbooks',authMiddleware, getAllBooks); //get all books from the database
router.put('/update',authMiddleware, updateAnyBook); //update any book in the database
router.delete('/delete',authMiddleware, deleteBook); //delete any book in the database based on the title
router.get('/getbookinfo',authMiddleware, getBookInfo); // getting the information of all books within the database
router.get('/getByPage/:page?',authMiddleware, getByPage); // getting the information of all books within the database

export default router;