
import { Request, Response } from 'express';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';
import { ShelfModel } from '../models/shelf.model';
import shelfService from '../services/shelf.service';

const createShelf = async (req: Request, res: Response) => {
    try {
        const reqBody = req.body as ShelfModel;
        const response = await shelfService.createShelf({ shelf: reqBody });
        if (response) {
            res.status(StatusCodes.CREATED).json({
                success: true,
                message: getReasonPhrase(StatusCodes.CREATED),
                data: response,
            });
        }

    } catch (error) {
        if (error instanceof Error) {
            if (error.message.includes("exists")) {
                res.status(StatusCodes.CONFLICT).json({
                    success: false,
                    error: error.message,
                })
            }
            res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message: error.message,
            });
        }
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            error: "Unknown error occurred",
        })
    }
}

const getAllShelves = async (req: Request, res: Response)=>{
    try{
        const result = await shelfService.getALlShelves();
        if(result){
            res.status(StatusCodes.OK).json({
                success: true,
                message: getReasonPhrase(StatusCodes.OK),
                data: result,
            });
        }

    } catch(error){
        if(error instanceof Error){
            if(error.message.includes("No shelves")){
                res.status(StatusCodes.NOT_FOUND).json({
                    success: false, 
                    message: error.message,
                });
            }else {
                res.json({
                    success: false ,
                    message: error.message,
                })
            }
        }
    }
}

const getShelvesForLibrary = async (req: Request , res: Response)=>{
    try{
        const libId = req.params.libId;
        const result = await shelfService.getShelvesForLibrary({libraryId: libId});
        if(result){
            res.status(StatusCodes.OK).json({
                success: false,
                message: getReasonPhrase(StatusCodes.OK),
                data: result,
            });
        }

    }catch(error){
        if(error instanceof Error){
             if(error.message.includes("No shelves")){
                res.status(StatusCodes.NOT_FOUND).json({
                    success: false, 
                    message: error.message,
                });
            }else {
                res.json({
                    success: false ,
                    message: error.message,
                })
            }
        }
    }
}

export default {
    createShelf,
    getAllShelves,
    getShelvesForLibrary,
}