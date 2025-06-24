
import users, { ResetUser, User } from '../models/user.model';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { userRegisterValidation, loginValidation, otpEmailValidation, resetPasswordValidation } from '../validations/user.validations';
import nodeMailer from 'nodemailer';
import { generateOtp } from '../utils/utils';
import { Types } from 'mongoose';
dotenv.config();
const SECRET = process.env.JWT_SECRET;
const createUser = async ({ user }: { user: User }) => {
    try {
        const { error } = userRegisterValidation.validate(user);
        if (error) {
            throw new Error(error.details[0].message);
        }
        const saltRounds = 10;
        const hashedPassword = await bcryptjs.hash(user.password as string, saltRounds);
        const newUser = {
            ...user,
            password: hashedPassword,
        };
        const userResult = await users.create(newUser) as User;
        const userInfo = await users.findOne({ email: userResult.email }).select('-__v  -password  -isDeleted')
        return userInfo;

    }
    catch (error) {
        const mongoError = error as { code?: number, keyPattern?: { [key: string]: number } };
        if (mongoError.code === 11000) {
            const field = Object.keys(mongoError.keyPattern || {})[0];
            const message = field === 'email'
                ? 'Email is already in use'
                : field === 'phone'
                    ? 'Phone number is already in use'
                    : 'Duplicate field value';
            throw new Error(message);
        }
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error("An Unknown error occurred");
        }
    }
};

const loginUser = async ({ user }: {
    user: User,
}) => {
    try {
        // const requiredFields = ['email','password'];
        // for(const field of requiredFields){
        //     if(!user[field as keyof User]){
        //         throw new Error(`${field} is required`);  
        //     }
        // }
        const { error } = loginValidation.validate(user);
        if (error) {
            throw new Error(error.details[0].message);
        }
        const userExists = await users.findOne({ email: user.email }) as User;
        if (!userExists) {
            throw new Error("User not found");
        }
        const isPasswordValid = await bcryptjs.compare(user.password as string, userExists.password as string);
        if (!isPasswordValid) {
            throw new Error("Incorrect email or password");
        }
        const authToken = jwt.sign(
            {
                id: userExists._id, email: userExists.email, role: userExists.role,
            },
            SECRET as string,
            { expiresIn: '1h' }
        );
        const refreshToken = jwt.sign(
            {
                id: userExists._id, email: userExists.email, role: userExists.role,
            },
            SECRET as string,
            { expiresIn: '7d' }
        );
        const userDetails = await users.findOne({ email: user.email }).select('-__v  -password  -isDeleted');
        const loggedInUser = {
            ...userDetails?.toObject(),
            "access_token": authToken,
            "refresh_Token": refreshToken,
        };
        return loggedInUser;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error("An unknown error occurred");
        }
    }

};


const createNewAccessToken = async ({ refreshToken }: { refreshToken: string }) => {
    try {
        if (!refreshToken) {
            throw new Error("Please enter the refresh token");
        }
        const decoded = jwt.verify(refreshToken, SECRET as string) as User;
        const newToken = jwt.sign({
            id: decoded.id, email: decoded.email, role: decoded.role,
        },
            SECRET as string,
            { expiresIn: '1h' }

        );
        return newToken;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
}

const getAllUsers = async () => {
    try {
        const allUsers = await users.find({}, {firstName: 1, lastName: 0, role: 0}).select('-__v -isDeleted -password');

        if (allUsers.length > 0) {
            return allUsers;
        } else {
            throw new Error("No users Found");
        }
    } catch (err) {
        if (err instanceof Error) {
            throw new Error(err.message);
        } else {
            throw new Error("An error occurred while fetching users ");
        }
    }
}

const sendOtp = async ({ user }: { user: User }) => {
    try {
        //validate user input 
        const { error } = otpEmailValidation.validate(user);
        if (error) {
            throw new Error(error.details[0].message);
        }
        //check if user exists
        const userExists = await users.findOne({ email: user.email }) as User;
        if (!userExists) {
            throw new Error("No user with this email: Please create an account");
        }
        //create otp
        const otp = generateOtp();
        const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);
        userExists.otp = otp;
        userExists.otpExpiry = otpExpiry;
        await userExists.save();
        //    const testAccount = await  nodeMailer.createTestAccount();
        const mailTransporter = nodeMailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.APP_EMAIL,
                pass: process.env.APP_PASS

            },
        });
        const mailOptions = {
            from: process.env.APP_EMAIL,
            to: user.email,
            subject: "Your OTP code",
            text: `Your OTP is : ${otp} `,
            html: `<p> Your OTP is: <strong> ${otp}</strong></p><p>It will expire in 5 minutes.</p>`,
        };
        const info = await mailTransporter.sendMail(mailOptions);
        console.log(info);

        if (info) {
            return true;
        } else {
            return false;
        }

    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error("An error occurred while resetting password");
        }
    }
}

const resetPasswordAndVerifyOtp = async ({ user }: { user: ResetUser }) => {
    try {
        const { error } = resetPasswordValidation.validate(user);
        if (error) {
            throw new Error(error.details[0].message);
        }
        const userExists = await users.findOne({ email: user.email }) as User;
        if (!userExists) {
            throw new Error("user not found . Please create an account");
        }
        if (user.otp !== userExists.otp || new Date() > (userExists.otpExpiry as Date)) {
            throw new Error("invalid or expired OTP");
        }
        const saltRounds = 10;
        const hashedPassword = await bcryptjs.hash(user.newPassword as string, saltRounds);
        userExists.password = hashedPassword;
        userExists.otp = null;
        userExists.otpExpiry = null;
        const result = await userExists.save();
        if (result) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error("An error occurred while resetting password");
        }
    }

}

const getUserById = async ({ id }: { id: string }) => {
    try {
        const userExists = await users.findById(new Types.ObjectId(`${id}`))
            .select('-__v -password -isDeleted -newPassword')
        if (!userExists) {
            throw new Error("User not found");
        }
        return userExists.toObject();
    } catch (err) {
        if (err instanceof Error) {
            throw new Error(err.message);
        } else {
            throw new Error("An error occurred while getting user profile");
        }
    }
}

export default {
    createUser,
    loginUser,
    createNewAccessToken,
    sendOtp,
    resetPasswordAndVerifyOtp,
    getAllUsers,
    getUserById,
}