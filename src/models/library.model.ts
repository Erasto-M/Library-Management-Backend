
import { Document, Schema, model } from 'mongoose';

//library Interface 
export interface LibraryInterface extends Document {
    name: string,
    location: string,
    description: string,
    isDeleted: boolean,
    createdAt: Date,
    updatedAt: Date,
}

// libary model class 
export class LibraryModel {

    public name: string;
    public location: string;
    public description?: string;
    public isDeleted: boolean;
    public createdAt: Date;
    public updatedAt: Date;

    constructor(
        name: string, location: string,
        isDeleted: boolean, updatedAt: Date,
        createdAt: Date, description?: string,
    ) {
        this.name = name;
        this.location = location;
        this.description = description;
        this.isDeleted = isDeleted;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

}

const librarySchema = new Schema<LibraryModel>({
    name: { type: String, required: true },
    location: { type: String, required: true },
    isDeleted: {type: Boolean , required: false , default: false},
    createdAt: {type: Date , required: false, default: Date.now,},
    updatedAt: {type: Date , required: false, default: Date.now,},
    description: { type: String, required: false, default: null },
    
}, {
    timestamps: true
},
);

// Mongoose middleware (hook ) - pre-save hook
librarySchema.pre<LibraryModel>("save", function(next){
    this.updatedAt =  new Date();
    next();
});

const libraries = model<LibraryModel>("Library", librarySchema);
export default libraries;