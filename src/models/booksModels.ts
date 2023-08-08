import mongoose, { Schema } from "mongoose";

export interface IBooks {
    _id: string,
    name: string,
    description: string,
    page_count: number
}

const bookSchema = new Schema({
    
    title: {
        type: String,
        require: [true]
    },
    author: {
        type: String,
        require: [true]
    },
    date_published: {
        type: String,
        require: [true]
    },
    description: {
        type: String,
        require: [true]
    },
    page_count: {
        type: Number,
        require: [true]
    },
    genre: {
        type: String,
        require: [true]
    },
    publisher: {
        type: String,
        require: [true]
    },
},
{
    timestamps: true
}
);

const Book = mongoose.model<IBooks>('Book', bookSchema);

export default Book;