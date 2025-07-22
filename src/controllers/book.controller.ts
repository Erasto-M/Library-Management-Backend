import { Request, Response } from "express";
import { BookModel } from "../models/book.model";
import bookService from "../services/book.service";
import { StatusCodes } from "http-status-codes";


/* Create a new book */
const addNewBook = async (req: Request, res: Response) => {
    try {
        const newBook = req.body as BookModel;
        const createdBook = await bookService.addNewBook({ book: newBook });
        if (createdBook) {
            res.status(StatusCodes.OK).json({
                success: true,
                message: "Book Created successfully",
                data: createdBook,
            });
        }

    } catch (err) {
        if (err instanceof Error) {
            res.json({
                success: false,
                message: err.message,
            })
        }
    }
}

/* Get  all books */
const getAllBooks = async (req: Request, res: Response) => {
    try {
        const allFetchedBooks = await bookService.getAllBooks();
        if (allFetchedBooks) {
            res.status(StatusCodes.OK).json({
                success: true,
                message: " Books fetched  successfully",
                data: allFetchedBooks,
            });
        }

    } catch (err) {
        if (err instanceof Error) {
            res.json({
                success: false,
                message: err.message,
            })
        }
    }
}

export default {
    addNewBook,
    getAllBooks,
}