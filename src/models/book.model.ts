import { Schema, model, Document } from "mongoose";

/* Book interface */

export interface BookInterface extends Document {
    title: string,
    author: string,
    publisher: string,
    shelfId: string,
    libraryId:  string,
    isbn: string,
    language: string,
    genre: string,
    description: string,
    publicationYear: Number,
    pages: Number,
    coverImageUrl: string,
    bookFileUrl: string,
    uploadedBy: string,
    uploadedAt: Date,
    createdAt: Date,
    updatedAt: Date,
    available: Boolean,
    isDeleted: Boolean,
}

export class BookModel {
    constructor(
        public title: string,
        public author: string,
        public publisher: string,
        public shelfId: string,
        public libraryId: string,
        public isbn: string,
        public language: string,
        public genre: string,
        public description: string,
        public publicationYear: Number,
        public pages: Number,
        public coverImageUrl: string,
        public bookFileUrl: string,
        public uploadedBy: string,
        public uploadedAt: Date,
        public createdAt: Date,
        public updatedAt: Date,
        public available: Boolean,
        public isDeleted: Boolean,

    ) { 
        
    }

}

const bookSchema = new Schema<BookInterface>({
    title: { type: String, required: true },
    author: { type: String, required: false, default: '' },
    publisher: { type: String, required: false, default: '' },
    isbn: { type: String, required: false, default: '' },
    language: { type: String, required: false, default: '' },
    shelfId: { type: String, required: true},
    libraryId: { type: String, required: true},
    genre: { type: String, required: false, default: '' },
    description: { type: String, required: false, default: '' },
    publicationYear: { type: Number, required: false, default: 0 },
    pages: { type: Number, required: false, default: 0 },
    coverImageUrl: { type: String, required: false, default: '' },
    bookFileUrl: { type: String, required: false, default: '' },
    available: { type: Boolean, required: false, default: false },
    uploadedBy: { type: String, required: false, default: '' },
    createdAt: { type: Date, required: false, default: Date.now() },
    updatedAt: { type: Date, required: false, default: Date.now() },
    isDeleted: { type: Boolean, required: false, default: false },

}, {
    timestamps: true,
});


/* Pre save hook  */
bookSchema.pre<BookInterface>("save", function (next) {
    this.updatedAt = new Date();
    next();
});

const books = model<BookModel>("book", bookSchema);

export default books;