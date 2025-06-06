
import {Request , Response } from 'express';
import { LibraryModel } from '../models/library.model';
import libraryService from '../services/library.service';


const createLibrary = async(req: Request , res: Response) =>{

    try{
        const library = req.body as LibraryModel;
        const createdLibrary = await libraryService.createLibrary({library: library});
        if(createdLibrary){
            res.json({
                success: true, 
                message: "library created SuccessFully",
                data: createdLibrary,
            });
        }
    }catch(err){
         if(err instanceof Error){
            res.json({
            success: false,
            message: err.message
        })
         }
    }
}

const getLibraries =async(req: Request, res: Response)=>{
    try{
        const keys = req.body; 
        const response = await libraryService.getLibraries({keys: keys});
        if(response){
            res.json({
                success: true,
                message: "Libraries fetched Successfully",
                data: response,
            });
        }
    }catch(err){
        if(err instanceof Error){
            res.json({
                success: false,
                message: err.message,
            })
        }
    }
}

const createBulkLibraries =async (req: Request, res: Response)=>{
    try{
        const reqBody = req.body as LibraryModel[];
        const response = await libraryService.createBulkLibraries({libList: reqBody});
        if(response){
            res.json({
                success: true ,
                message: "bulk libraries created successfully",
                data: response,
            });
        }
    }catch(err){
        if(err instanceof Error){
         res.json({
            success: false,
            message: err.message,
         })
        }
    }
}
const getLibraryById =async(req: Request, res: Response)=>{
    try{
        const libId = req.params.libId as string;
        const response = await libraryService.getLibById({id:libId });
        if(response){
            res.json({
                success: true,
                message: "Library fetched successfully",
                data: response,
            })
        }
    }catch(err){
        if(err instanceof Error){
            res.json({
                success: false,
                message: err.message,
            })
        }
    }
}

const getLibrariesPaginated =async(req: Request, res: Response)=>{
    try{
        const skip= req.query.skip ||0;
        const limit = req.query.limit || 0;
        const result = await libraryService.getLibrariesPaginated({skip: skip as number, limit : limit as number});
        if(result){
            res.json(
                {
                    success: true,
                    message: "success",
                    result
                }
            )
        }
    } catch(err){
        if(err instanceof Error){
            res.json({
                success: false,
                message: err.message,
            })
        }
    }
}

const updateLibraryInfo = async(req: Request , res: Response) =>{
    try{
        const libId = req.params.libId;
        const updateLibData = req.body as Partial<LibraryModel>;
        const response = await libraryService.updateLibrary({id: libId, updateData: updateLibData});
        if(response){
            res.json({
                success: true,
                message: "Library updated successfully",
                data: response

            })
        }
    }catch(err){
        if(err instanceof Error){
            res.json({
                success: false,
                message: err.message,
            })
        }
    }
}
const updateBulkLibraries= async (req: Request, res:Response)=>{
    try{
        const { ids, data} = req.body;
        const result = await libraryService.updateBulkLibraries({idList: ids, updateDataList: data});
        if(result){
            res.json({
                success: true,
                message: "Libraries updated successfully",
                data: result,
            })
        }
    }catch(err){
        if(err instanceof Error){
            res.json({
                success: false, 
                message: err.message,
            })
        }
    }
}

const deleteLibrary =async(req: Request , res: Response)=>{
    try{
        const libraryId = req.params.libId as string;
        const response = await libraryService.deleteLibrary({id: libraryId});
        if(response){
            res.json({
                success: true,
                message: "Library Deleted successfully",
                data: response,
            })
        }
    } catch(err){
        if(err instanceof Error){
            res.json({
                success: false , 
                message: err.message,
            })
        }
    }
}
const searchLibrary = async (req: Request , res: Response) =>{
    try{
        const searchStr = req.params.searchStr.trim() as string;
        const result = await libraryService.searchLibrary({searchStr: searchStr});
        if(result){
            res.json({
                success: true,
                message: "success",
                data: result,
            })
        }

    }catch(err){
        if(err instanceof Error){
            res.json({
                success: false,
                message: err.message,
            })
        }
    }
}

const getLibTotalCount = async(req: Request, res: Response)=>{
    try{
        const result = await libraryService.getLibrariesTotalCount();
        if(result){
            res.json({
                success: true,
                message: "Success",
                count: result,
            })
        }
    }catch(err){
        if(err instanceof Error){
            res.json({
                success: false,
                message: err.message,
            })
        }
    }
}
export default{
    createLibrary,
    getLibraries, 
    createBulkLibraries,
    getLibraryById,
    updateLibraryInfo,
    deleteLibrary,
    updateBulkLibraries,
    searchLibrary,
    getLibrariesPaginated,
    getLibTotalCount,
}
