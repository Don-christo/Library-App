import express, { Request, Response, NextFunction } from 'express'
import Books from '../models/booksModels';


// To create a new Book
export const createBook = async(req: Request, res: Response, next: NextFunction) => {
    try {
        
        const {
            title,
            author,
            date_published,
            description,
            page_count,
            genre,
            publisher,
        } = req.body
      
        const findBook = await Books.findOne({title});

        if(findBook){
            return res.status(400).json({
                message: `Book already exists`
            });
        };
        if(!findBook){
            let newBook = await Books.create({
                title,
                author,
                date_published,
                description,
                page_count,
                genre,
                publisher,
            });
           // const mainBook = await Books.findOne({title});
             const book = await newBook.save()
          if(book){
            
            return res.status(200).json({
                message: `Book created successfully`, 
                book
            })
          }
          return res.status(401).json({
            message: `unable to create Book`
          });
        }

    } catch (error) {
        console.log(error)
    }
}

// GET ALL BOOKS FROM THE DATABASE
export const getAllBooks = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const allBooks = await Books.find({});
 
        if(!allBooks){
         return res.status(404).json({
           message: `Books not fetched`
         })
        }
 
        return res.status(200).json({
          message: `All Books fetched successfully`,
          allBooks
        })
      } catch (error) {
       return res.status(500).json({
         message: `internal server error`,
         Error: `books/getAllBooks`
      });
     }
}

// Edit a Book or Update it based on title - UPDATE Request (UPDATE)
export const updateAnyBook = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const {title, author,date_published,description,page_count,genre, publisher,} = req.body;
    
        const book = await Books.findOne({title});
    
        if(!book){
          return res.status(404).json({
            message: `Book does not exist `
          });
        }
       const updatedBook = await Books.findOneAndUpdate({title}, {author, date_published,description,page_count,genre,publisher});
    
       if(updatedBook){
          return res.status(200).json({
            message:`Book updated successfully`,
            updatedBook
          })
       }
       return res.status(401).json({
        message:`Book update failed`
       })
      } catch (error) {
        return res.status(500).json({
          message: `internal server error`,
          Error: `users/updateAnyBook`
      });
    }
};



// Delete a book from the database based on the title - DELETE Request (DELETE)
export const deleteBook = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const {title} = req.body;
        const bookToDelete = await Books.findOneAndDelete({title})
    
        if(!bookToDelete){
          return res.status(500).json({
            message: `Book not deleted`
          });
        }
        
        const books = await Books.find({})
        return res.status(200).json({
           message:`Deleted successfully`,
           books
        })
      } catch (error) {
        return res.status(500).json({
          message: `internal server error`,
          Error: `books/delete`
      });
      }
};

// Getting the information of a book based on the id - GET Request (READ)
export const getBookInfo = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const {title} = req.body;
        const bookGet = await Books.findOne({title})

        if(!bookGet){
            return res.status(500).json({
              message: `Book not found`
            });
          }
          return res.status(200).json({
            message: `Books information fetched successfully`,
            bookGet
          });
    } catch (err) {
        res.status(500).send({ message: `Couldn't retrive book information`})
    }
}

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

export const getByPage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.params.page) || 1; 
    const limit = 5;

    const offset = (page - 1) * limit;

    const books = await Books.find()
      .skip(offset)
      .limit(limit);

    const count = await Books.countDocuments();
    const totalPages = Math.ceil(count / limit);

    res.json({
      books,
      currentPage: page,
      totalPages,
    });
  } catch (error) {
    res.status(500).send({ message: `Couldn't retrieve book information` });
  }
};
