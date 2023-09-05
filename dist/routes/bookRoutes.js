"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookControllers_1 = require("../controllers/bookControllers");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = express_1.default.Router();
router.post('/create', authMiddleware_1.authMiddleware, bookControllers_1.createBook); //create a new book and add to database
router.get('/getbooks', authMiddleware_1.authMiddleware, bookControllers_1.getAllBooks); //get all books from the database
router.put('/update', authMiddleware_1.authMiddleware, bookControllers_1.updateAnyBook); //update any book in the database
router.delete('/delete', authMiddleware_1.authMiddleware, bookControllers_1.deleteBook); //delete any book in the database based on the title
router.get('/getbookinfo', authMiddleware_1.authMiddleware, bookControllers_1.getBookInfo); // getting the information of all books within the database
router.get('/getByPage/:page?', authMiddleware_1.authMiddleware, bookControllers_1.getByPage); // getting the information of all books within the database
exports.default = router;
