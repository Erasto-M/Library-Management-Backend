


//create new shelf

import { ShelfModel  } from "../models/shelf.model";
import shelves from "../models/shelf.model";
import mongoose from "mongoose";
const projectionKeys = {
"label": 1,
"capacity": 1, 
"libraryId": 1, 
"isDeleted": 1,
}
const createShelf = async({shelf}: {shelf: ShelfModel}) =>{
    //confirm whether library Id is an object id
    const libraryId = shelf.libraryId ;
    if(!mongoose.Types.ObjectId.isValid(libraryId)){
        throw new Error("The library id is invalid ");
    }
    //check whether shelf exists 
   const exists = await shelves.findOne({label: shelf.label}, projectionKeys);
   if(exists){
    throw new Error("Shelf exists . Please create a new one");
   }
 const createdShelf = await shelves.create(shelf);
 return createdShelf;
}

//get All shelves 
const getALlShelves =async ()=>{
    const fetchedShelves = await shelves.find({}, projectionKeys);
    if(fetchedShelves.length === 0){
        throw new Error("No shelves found. Please create one");
    }

    return fetchedShelves;
}

//get shelves for a library 
const getShelvesForLibrary =async ({libraryId}: {libraryId: string})=>{

    const result = await shelves.find({libraryId: libraryId});
    if(result.length ===0){
        throw new Error("No shelves found for this library , Please add one");
    }

    return result;

}


export default{
  createShelf,
  getALlShelves,
  getShelvesForLibrary,
}