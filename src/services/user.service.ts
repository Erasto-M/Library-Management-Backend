
import users, { User } from '../models/user.model';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const SECRET = process.env.JWT_SECRET;
const createUser = async ({ user }: { user: User }) => {
    try {
        const userExists = await users.findOne({ email: user.email });
        if (userExists) {
            throw new Error(
                "User already exists",
            )
        }
        const saltRounds = 10;
        const hashedPassword = await bcryptjs.hash(user.password as string, saltRounds);
        const newUser = {
            ...user,
            password: hashedPassword,
        };
        const userResult = await users.create(newUser);
        return userResult;

    }
    catch (error) {
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
        const userExists = await users.findOne({ email: user.email });
        if (!userExists) {
            throw new Error("User not found");
        }
        const isPasswordValid = await bcryptjs.compare(user.password as string, userExists.password as string);
        if (!isPasswordValid) {
            throw new Error("Incorrect email or password");
        }
        const token = jwt.sign(
            {
                id: userExists._id, email: userExists.email,
            },
            SECRET as string,
            { expiresIn: '1h' }
        );
        const loggedInUser = {
            ...user,
            "auth_token": token,
        };
        return loggedInUser;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error("An Unknown error occurred");
        }
    }

};

export default {
    createUser,
    loginUser,
}