
import { Document, Schema, model} from 'mongoose';


export interface ShelfInterface extends Document {
    label: string,
    capacity: number,
    libraryId: string,
    isDeleted?: boolean,
    createdAt?: Date,
    upDatedAt?:Date,
    
}

export class ShelfModel {
    constructor(
        public label: string,
        public capacity: number,
        public libraryId: string,
        public isDeleted?: boolean,
        public createdAt?: Date,
        public updatedAt?: Date,
    ) {
    }
}

const shelfSchema = new Schema<ShelfModel>({
    label: {type: String , required: true },
    capacity: {type: Number , required: true },
    libraryId: {type: String , required: true , },
    isDeleted: {type: Boolean, required: false , default: false},
    createdAt: {type: Date , required: false , default: Date.now()},
    updatedAt: {type: Date , required: false , default: Date.now(),},

},
{
    timestamps: true,
},
);

shelfSchema.pre<ShelfModel>("save",function(next){
    this.updatedAt = new Date();
    next();
});

const shelves = model<ShelfModel>("shelves", shelfSchema);

export default shelves;