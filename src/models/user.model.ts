import mongoose, { Document, Schema } from 'mongoose';

export interface ResetUser extends Document{
    email: string,
    otp: string,
    newPassword: string,
}
export interface User extends Document {
    firstName?: string,
    middleName?: string,
    lastName?: string,
    password?: string,
    newPassword?: string,
    email: string,
    age?: number,
    phone?: string,
    role?: string,
    otp?: string |null,
    otpExpiry?: Date | null,
    isDeleted?: boolean,
    createdAt?: Date,
    updatedAt?: Date
}

const userSchema = new Schema({
    firstName: { type: String, required: true, default: '', },
    middleName: { type: String, required: false, default: '', },
    lastName: { type: String, required: true, default: '', },
    email: { type: String, required: true, default: '',unique: true },
    phone: { type: String, required: true, default: '',unique: true },
    role: {type: String , required: true , default : 'student'},
    otp: {type: String , default: null  },
    otpExpiry: {type: Date, default: null},
    password: { type: String, required: true, default: '', },
    newPassword: {type: String, default : ''},
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