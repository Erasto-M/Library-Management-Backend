import libraries, { LibraryModel } from "../models/library.model";
import { Types } from 'mongoose';


// user to enter this keys in the request body  
type ProjectionKeys = {
    [key: string] : 0|1;
};

const globalFilterKeys ={name: 1, location: 1, description: 1 , createdAt : 1};

const createLibrary = async ({ library }: { library: LibraryModel }) => {
    // check if library exists
    const itExists = await libraries.findOne({
        name: library.name,
        location: library.location,
    });
    if (itExists) {
        throw new Error("Library already exists");
    }
    // create a new Library 
    const newLibrary = await libraries.create(library);
    const result = await libraries.findById(new Types.ObjectId(`${newLibrary._id}`), { name: 1, location: 1, description: 1, createdAt: 1 });

    return result;

}
const createBulkLibraries = async({libList}: {libList: LibraryModel[]})=>{
    const added: LibraryModel [] = []; 
    const skipped :LibraryModel[] = [];
     
     for(const lib of  libList){
        const exists = await libraries.findOne({name: lib.name , location: lib.location});
        if(exists){
            skipped.push(lib);
            continue;
        }else {
            const newLibrary = lib;
        await libraries.create(lib);
        added.push(newLibrary);
        } 
     }
     const result = {
        "create_message": `Added ${added.length} libraries and skipped ${skipped.length} libraries`,
        "skippedMessage" : "Skipped Libraries are not added  to the database. This is because they were recently added ",
        "added": added,
        "skipped": skipped,  
     }
     return result;
}

// get all libraries
const getLibraries= async({keys}: { keys?: ProjectionKeys})=>{
    const projectionKeys = keys || {name: 1, location: 1, description: 1, createdAt: 1};
    const libraryList = await libraries.find({}, projectionKeys);

    if(libraryList.length === 0){
        throw new Error("No libraries Found . Please add one");
    }
    return libraryList;
    
}

// get libraryById
const getLibById = async({id}:{id: string})=>{
    const libList = await libraries.find();
    if(libList.length ===0){
        throw new Error("No libraries Found . Please add one");
    } 
    const libFetched = await libraries.findById(new Types.ObjectId(`${id}`), globalFilterKeys);
    return libFetched;
}

// get libraries paginated 
const getLibrariesPaginated = async({skip, limit}: {skip: number, limit: number})=>{

     const paginatedList = await libraries.find({}, globalFilterKeys).skip(skip).limit(limit).sort({createdAt: -1});
     const totalCount = await libraries.countDocuments();

     const resultToReturn = {
        data: paginatedList,
        total: totalCount,
        count: paginatedList.length,
        currentPage: (Math.floor(skip/limit)+1)||0,
        totalPages:(Math.ceil(totalCount/(limit||0))) || 0,

     }
     return resultToReturn;
}

//updateLibrary
const updateLibrary = async ({id, updateData}: {id: string, updateData: Partial<LibraryModel>})=>{
    const libId = new Types.ObjectId(id);
    const exists = await libraries.findById(libId);  
   if(!exists){
    throw new Error("Library with the given id does not exist");
   }
   const updatedLibrary = await libraries.updateOne({_id: libId}, {
   $set: updateData,
   });

   let updatedResult;

   if(updatedLibrary){
    updatedResult = await libraries.findOne({_id: libId}, globalFilterKeys);
   }

   return updatedResult;
}

const updateBulkLibraries = async({idList, updateDataList}: {idList : string[], updateDataList : Partial<LibraryModel>[]})=>{
    const libList = await libraries.find();
    if(idList.length === 0 || updateDataList.length === 0){
        throw new Error("Id List and Data List must not be empty");
    }
    if(idList.length !== updateDataList.length){
        throw new Error("Id List and Data list must be of the same length");
    }
    if(libList.length ===0){
        throw new Error("No libraries Found . Please add one");
    } 

    const bulkUpdates = idList.map((id, index)=>({
        updateOne: {
            filter: {_id: new Types.ObjectId(id)},
            update: {$set: updateDataList[index]},
        }
    }));
    
   const result = await libraries.bulkWrite(bulkUpdates);
   const  updatedLibraries : LibraryModel[] =[];

   if(result){
    for(const id of idList){
        const updatedLibId = new Types.ObjectId(id);
        const newResult = await libraries.findOne({_id:updatedLibId }, globalFilterKeys );
        if(newResult){
            updatedLibraries.push(newResult);
        }else {
            throw new Error("Something went wrong");
        }
    }
   }
   return updatedLibraries;

}
//delete a library
const deleteLibrary =async({id}: {id: string})=>{
    const libId = new Types.ObjectId(id);
    const exists = await libraries.findById(libId);
    if(!exists){
        throw new Error("The library you want to delete does not exist");
    }
    const deletedLibrary = await libraries.deleteOne({_id: libId});
    
    return deletedLibrary;
}

// supports partial match and Exact Match 
const searchLibrary = async ( {searchStr}:{searchStr: string})=>{

    if(!searchStr){
        throw new Error("Please add a search String");
    }
  const regex = new RegExp(`^${searchStr}`, `i`);
  
    const foundLibraries = await libraries.find({
        $or: [
            {name: regex}, 
            {name: {$regex : `^${searchStr}$`, $options: 'i'}},
            {location: regex},
            {location: {$regex : `^${searchStr}$`, $options: 'i'}},
        ]
    });
     
    if(foundLibraries.length === 0){
        throw new Error(" No Libraries matched the search string");
    }
      return foundLibraries;
}

const getLibrariesTotalCount = async ()=>{
    const totalCount = await libraries.countDocuments();
    return totalCount;
}
export default {
    createLibrary,
    getLibraries,
    createBulkLibraries, 
    getLibById,
    updateLibrary,
    deleteLibrary,
    updateBulkLibraries,
    searchLibrary,
    getLibrariesPaginated,
    getLibrariesTotalCount,
}