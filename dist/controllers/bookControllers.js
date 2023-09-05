"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getByPage = exports.getBookInfo = exports.deleteBook = exports.updateAnyBook = exports.getAllBooks = exports.createBook = void 0;
const booksModels_1 = __importDefault(require("../models/booksModels"));
// To create a new Book
const createBook = async (req, res, next) => {
    try {
        const { title, author, date_published, description, page_count, genre, publisher, } = req.body;
        const findBook = await booksModels_1.default.findOne({ title });
        if (findBook) {
            return res.status(400).json({
                message: `Book already exists`
            });
        }
        ;
        if (!findBook) {
            let newBook = await booksModels_1.default.create({
                title,
                author,
                date_published,
                description,
                page_count,
                genre,
                publisher,
            });
            // const mainBook = await Books.findOne({title});
            const book = await newBook.save();
            if (book) {
                return res.status(200).json({
                    message: `Book created successfully`,
                    book
                });
            }
            return res.status(401).json({
                message: `unable to create Book`
            });
        }
    }
    catch (error) {
        console.log(error);
    }
};
exports.createBook = createBook;
// GET ALL BOOKS FROM THE DATABASE
const getAllBooks = async (req, res, next) => {
    try {
        const allBooks = await booksModels_1.default.find({});
        if (!allBooks) {
            return res.status(404).json({
                message: `Books not fetched`
            });
        }
        return res.status(200).json({
            message: `All Books fetched successfully`,
            allBooks
        });
    }
    catch (error) {
        return res.status(500).json({
            message: `internal server error`,
            Error: `books/getAllBooks`
        });
    }
};
exports.getAllBooks = getAllBooks;
// Edit a Book or Update it based on title - UPDATE Request (UPDATE)
const updateAnyBook = async (req, res, next) => {
    try {
        const { title, author, date_published, description, page_count, genre, publisher, } = req.body;
        const book = await booksModels_1.default.findOne({ title });
        if (!book) {
            return res.status(404).json({
                message: `Book does not exist `
            });
        }
        const updatedBook = await booksModels_1.default.findOneAndUpdate({ title }, { author, date_published, description, page_count, genre, publisher });
        if (updatedBook) {
            return res.status(200).json({
                message: `Book updated successfully`,
                updatedBook
            });
        }
        return res.status(401).json({
            message: `Book update failed`
        });
    }
    catch (error) {
        return res.status(500).json({
            message: `internal server error`,
            Error: `users/updateAnyBook`
        });
    }
};
exports.updateAnyBook = updateAnyBook;
// Delete a book from the database based on the title - DELETE Request (DELETE)
const deleteBook = async (req, res, next) => {
    try {
        const { title } = req.body;
        const bookToDelete = await booksModels_1.default.findOneAndDelete({ title });
        if (!bookToDelete) {
            return res.status(500).json({
                message: `Book not deleted`
            });
        }
        const books = await booksModels_1.default.find({});
        return res.status(200).json({
            message: `Deleted successfully`,
            books
        });
    }
    catch (error) {
        return res.status(500).json({
            message: `internal server error`,
            Error: `books/delete`
        });
    }
};
exports.deleteBook = deleteBook;
// Getting the information of a book based on the id - GET Request (READ)
const getBookInfo = async (req, res, next) => {
    try {
        const { title } = req.body;
        const bookGet = await booksModels_1.default.findOne({ title });
        if (!bookGet) {
            return res.status(500).json({
                message: `Book not found`
            });
        }
        return res.status(200).json({
            message: `Books information fetched successfully`,
            bookGet
        });
    }
    catch (err) {
        res.status(500).send({ message: `Couldn't retrive book information` });
    }
};
exports.getBookInfo = getBookInfo;
// export const getByPage = async(req:Request, res:Response, next: NextFunction)=>{
//   try {
//     const page = parseInt(req.query.page as string) || 1; // Current page (defaults to 1)
//     const limit = 5; // Number of items per page
//     // Calculate the offset
//     const offset = (page - 1) * limit;
//     // Fetch books from the database using offset and limit
//     Books.find()
//       .skip(offset)
//       .limit(limit)
//       .then((books) => {
//         // Calculate the total number of pages
//         Books.countDocuments()
//           .then((count) => {
//             const totalPages = Math.ceil(count / limit);
//             // Return the books and pagination metadata
//             res.json({
//               books,
//               currentPage: page,
//               totalPages
//             });
//           })
//           .catch((countErr) => {
//             res.status(500).json({ error: 'Failed to fetch book count' });
//           });
//       })
//       .catch((err) => {
//         res.status(500).json({ error: 'Failed to fetch books' });
//       });
//   } catch (error) {
//     res.status(500).send({ message: `Couldn't retrive book informations`})
//   }
// }
const getByPage = async (req, res, next) => {
    try {
        const page = parseInt(req.params.page) || 1;
        const limit = 5;
        const offset = (page - 1) * limit;
        const books = await booksModels_1.default.find()
            .skip(offset)
            .limit(limit);
        const count = await booksModels_1.default.countDocuments();
        const totalPages = Math.ceil(count / limit);
        res.json({
            books,
            currentPage: page,
            totalPages,
        });
    }
    catch (error) {
        res.status(500).send({ message: `Couldn't retrieve book information` });
    }
};
exports.getByPage = getByPage;
