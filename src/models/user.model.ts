import mongoose, { Document, Schema } from 'mongoose';

export interface User extends Document {
    firstName?: string,
    middleName?: string,
    lastName?: string,
    password?: string,
    email: string,
    age?: number,
    phone?: string,
    isDeleted?: boolean,
    createdAt?: Date,
    updatedAt?: Date
}

const userSchema = new Schema({
    firstName: { type: String, required: true, default: '', },
    middleName: { type: String, required: false, default: '', },
    lastName: { type: String, required: false, default: '', },
    email: { type: String, required: true, default: '', },
    phone: { type: String, required: true, default: '', },
    password: { type: String, required: false, default: '', },
    isDeleted: { type: String, required: false, default: false, },
    createdAt: { type: Date, required: false, default: Date.now, },
    updatedAt: { type: Date, required: false, default: Date.now, }
}, {
    timestamps: true,
});

userSchema.pre<User>('save',function(next){
this.updatedAt =new Date();
next();
});

const users = mongoose.model<User>("users", userSchema);
export default users;