"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getAllUsers = exports.login = exports.createUser = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const utility_1 = require("../utilities/utility");
const notification_1 = require("../utilities/notification");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createUser = async (req, res, next) => {
    try {
        const { firstName, lastName, email, } = req.body;
        const findUser = await userModel_1.default.findOne({ email });
        if (findUser) {
            return res.status(400).json({
                message: `User already exists`
            });
        }
        const salt = await (0, utility_1.SaltGenerator)();
        const password = await (0, utility_1.passwordGenerator)(lastName);
        const hashedPassword = await (0, utility_1.hashPassword)(password, salt);
        if (!findUser) {
            let newUser = await userModel_1.default.create({
                firstName,
                lastName,
                email,
                password: hashedPassword,
                role: `Author`,
                books: []
            });
            // const user:any = await User.find({email});
            // user.books.push(newUser);
            const mainUser = await userModel_1.default.findOne({ email });
            if (mainUser) {
                const html = (0, notification_1.emailHtml)(email, password);
                await (0, notification_1.sendmail)(`${process.env.GMAIL_USER}`, email, "Welcome", html);
                return res.status(200).json({
                    message: `User created successfully`,
                    // newUser,
                    role: mainUser
                });
            }
            return res.status(401).json({
                message: `Unable to create user`
            });
        }
    }
    catch (err) {
        return res.status(500).json({
            message: `Internal Server Error`,
            Error: `/users/create`
        });
    }
};
exports.createUser = createUser;
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await userModel_1.default.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: `User does not exist, please register`
            });
        }
        if (user) {
            const validate = await bcryptjs_1.default.compare(password, user.password);
            if (validate) {
                const token = jsonwebtoken_1.default.sign(user.toObject(), "mySecret", {
                    expiresIn: 604800
                });
                return res.status(200).json({
                    message: `Login successful`,
                    email: user.email,
                    token
                });
            }
            if (!validate) {
                return res.status(400).json({
                    message: `Invalid password`
                });
            }
        }
    }
    catch (err) {
        return res.status(500).json({
            message: `Internal Server Error`,
            Error: `/users/login`
        });
    }
};
exports.login = login;
const getAllUsers = async (req, res, next) => {
    try {
        const allUsers = await userModel_1.default.find({});
        if (!allUsers) {
            return res.status(404).json({
                message: `Users not fetched`
            });
        }
        return res.status(200).json({
            message: `Users fetched successfully`,
            allUsers
        });
    }
    catch (err) {
        return res.status(500).json({
            message: `Internal Server Error`,
            Error: `/users/getAllUsers`
        });
    }
};
exports.getAllUsers = getAllUsers;
const updateUser = async (req, res, next) => {
    try {
        const { email, firstName, lastName } = req.body;
        const user = await userModel_1.default.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: `User does not exist`
            });
        }
        const updatedUser = await userModel_1.default.findOneAndUpdate({ email }, { firstName, lastName });
        if (updatedUser) {
            return res.status(200).json({
                message: `User updated succesfully`,
                updatedUser
            });
        }
        return res.status(401).json({
            message: `Could not update user`
        });
    }
    catch (err) {
        return res.status(500).json({
            message: `Internal Server Error`,
            Error: `/users/updateUser`
        });
    }
};
exports.updateUser = updateUser;
const deleteUser = async (req, res, next) => {
    try {
        const { email } = req.body;
        const userToDelete = await userModel_1.default.findOneAndDelete({ email });
        if (!userToDelete) {
            return res.status(404).json({
                message: `User can't be deleted`,
            });
        }
        const users = await userModel_1.default.find({});
        return res.status(200).json({
            message: `Deleted Successfully`,
            users
        });
    }
    catch (err) {
        return res.status(404).json({
            message: `Internal Server Error`,
            Error: '/users/delete'
        });
    }
};
exports.deleteUser = deleteUser;
