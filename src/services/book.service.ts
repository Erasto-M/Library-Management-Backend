
import { BookModel } from "../models/book.model";
import books from '../models/book.model';
import mongoose, { Types } from 'mongoose';

const projectionKeys = {
    "createdAt": 0,
    "updatedAt": 0,

}

/* Add new book  */
const addNewBook = async ({ book }: { book: BookModel }) => {
    try {
        /* Check if the book exists */
        const libaryId = book.libraryId;
        const shelfId = book.shelfId;

        /* Check for lib Id  validity  */
        if (!mongoose.Types.ObjectId.isValid(libaryId)) {
            throw new Error("The library id is invalid");
        }
        /* Check for shelf Id  validity  */
        if (!mongoose.Types.ObjectId.isValid(shelfId)) {
            throw new Error("The shelf id is invalid");
        }

        const exists = await books.findOne({ name: book.title });
        if (exists) {
            throw new Error("Book already exists. Please create a new one");
        }
 
        const createdBook = await books.create(book);
        return createdBook;

    } catch (err) {
        if (err instanceof Error) {
            throw new Error(err.message);
        } else {
            throw new Error("Error creating book");
        }
    }

}


/* Get all books  */
const getAllBooks = async () => {
    try {
        const response = await books.find({}, projectionKeys);
        return response;
    } catch (err) {
        if (err instanceof Error) {
            throw new Error(err.message);
        } else {
            throw new Error("Error fetching books");
        }
    }
}



/*  Get book by Id   */
const getBookById = async ({ bookId }: { bookId: String }) => {
    try {
        if (!bookId) {
            throw new Error("Please enter book id ");
        }

        const fetchedBook = await books.findById(new Types.ObjectId(bookId as string));
        return fetchedBook;
    } catch (err) {
        if (err instanceof Error) {
            throw new Error(err.message);
        } else {
            throw new Error("Error getting book");
        }
    }
}


export default {
    addNewBook,
    getAllBooks,
    getBookById,
}