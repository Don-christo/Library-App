import User from '../models/userModel';
import Book from '../models/booksModels';
import { Request, Response, NextFunction } from 'express';
import { SaltGenerator, passwordGenerator, hashPassword, tokenGenerator } from '../utilities/utility';
import { emailHtml, sendmail } from '../utilities/notification';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'


export const createUser = async (req:Request, res:Response, next:NextFunction) => {
    try{
        const {
            firstName,
            lastName,
            email,
        } = req.body;

        const findUser = await User.findOne({ email });
        if(findUser) {
            return res.status(400).json({
                message: `User already exists`
            })
        }

        const salt = await SaltGenerator();
        const password = await passwordGenerator(lastName);
        const hashedPassword = await hashPassword(password, salt);

        if(!findUser) {
            let newUser = await User.create({
                firstName,
                lastName,
                email,
                password: hashedPassword,
                role: `Author`,
                books: []
            })

            // const user:any = await User.find({email});
            // user.books.push(newUser);

            const mainUser = await User.findOne({email});
            if(mainUser) {
                const html = emailHtml(email, password);
                await sendmail(`${process.env.GMAIL_USER}`, email, "Welcome", html)
                return res.status(200).json({
                    message: `User created successfully`,
                    // newUser,
                    role: mainUser
                })
            }
            return res.status(401).json({
                message: `Unable to create user`
            })
        }

    }catch(err){
        return res.status(500).json({
            message: `Internal Server Error`,
            Error: `/users/create`
        })
    }
}

export const login = async (req:Request, res:Response, next:NextFunction) => {
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email});

        if(!user) {
            return res.status(404).json({
                message: `User does not exist, please register`
            })
        }

        if(user) {
            const validate = await bcrypt.compare(password, user.password);

            if(validate) {
                const token = jwt.sign(user.toObject(), "mySecret",{
                    expiresIn: 604800
                });
                return res.status(200).json({
                    message: `Login successful`,
                    email: user.email,
                    token
                })
            }

            if(!validate) {
                return res.status(400).json({
                    message: `Invalid password`
                })
            }

        }
    }catch(err){
        return res.status(500).json({
            message: `Internal Server Error`,
            Error: `/users/login`
        })
    }
}

export const getAllUsers = async (req:Request, res:Response, next:NextFunction) => {
    try{
        const allUsers = await User.find({});
        if(!allUsers) {
            return res.status(404).json({
                message: `Users not fetched`
            })
        }
        return res.status(200).json({
            message: `Users fetched successfully`,
            allUsers
        })
    }catch(err){
        return res.status(500).json({
            message: `Internal Server Error`,
            Error: `/users/getAllUsers`
        })
    }
}

export const updateUser = async (req:Request, res:Response, next:NextFunction) => {
    try{
        const {email, firstName, lastName} = req.body;

        const user = await User.findOne({email});

        if(!user) {
            return res.status(404).json({
                message: `User does not exist`
            })
        }
        
        const updatedUser = await User.findOneAndUpdate({email}, {firstName, lastName})

        if(updatedUser) {
            return res.status(200).json({
                message:`User updated succesfully`,
                updatedUser
            })
        }

        return res.status(401).json({
            message: `Could not update user`
        })


    }catch(err) {
        return res.status(500).json({
            message: `Internal Server Error`,
            Error: `/users/updateUser`
        })
    }
}

export const deleteUser = async (req:Request, res:Response, next:NextFunction) => {
    try{
        const {email} = req.body;
        const userToDelete = await User.findOneAndDelete({email});
        if(!userToDelete) {
            return res.status(404).json({
                message: `User can't be deleted`,
            })
        }
        const users =await User.find({});
        return res.status(200).json({
            message: `Deleted Successfully`,
            users
        })
    }catch(err) {
        return res.status(404).json({
            message: `Internal Server Error`,
            Error: '/users/delete'
        })
    }
}