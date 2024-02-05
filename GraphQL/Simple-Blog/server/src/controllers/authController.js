import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient();

export const signToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET);
}

export const loginUser = async ({ email, password }) => {
    try {
        const isUserExist = await prisma.user.findUnique({
            where: { email }
        });
        
        if(!isUserExist) {
            throw new Error('No such user exist!');
        }

        if(!bcrypt.compareSync(password, isUserExist.password)) {
            throw new Error("Incorrect password!");
        }

        const token = signToken({ id: isUserExist.id });
        
        return {
            status: true,
            message: "Logged In Successful!",
            token
        }

    } catch (error) {
        throw new Error(error.message);
    }
}

export const registerUser = async ({ name, email, password }) => {
    try {
        const isUserExist = await prisma.user.findUnique({
            where: { email }
        })

        if(isUserExist) {
            throw new Error('Email already in use!');
        }
        
        const hashedPassword = bcrypt.hashSync(password, 10);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        })

        const token = signToken({ id: user.id });

        return {
            status: true,
            message: "Registration Successful!",
            token
        }
    } catch (error) {
        throw new Error(error.message);
    }
}