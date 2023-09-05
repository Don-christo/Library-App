"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenGenerator = exports.hashPassword = exports.passwordGenerator = exports.SaltGenerator = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SaltGenerator = async () => {
    return bcryptjs_1.default.genSalt();
};
exports.SaltGenerator = SaltGenerator;
const passwordGenerator = (lastName) => {
    const mixup = lastName += Math.floor(1000 + Math.random() * 90000);
    return mixup;
};
exports.passwordGenerator = passwordGenerator;
const hashPassword = async (password, salt) => {
    return await bcryptjs_1.default.hash(password, salt);
};
exports.hashPassword = hashPassword;
const tokenGenerator = async (_id) => {
    return await jsonwebtoken_1.default.sign({ _id }, `${process.env.APP_SECRET}`, { expiresIn: `1d` });
};
exports.tokenGenerator = tokenGenerator;
