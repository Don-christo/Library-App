"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connectDatabase = async () => {
    try {
        const connect = mongoose_1.default.connect(`mongodb+srv://Donchristo:dbUserPassword@cluster0.xm6ncbq.mongodb.net/exams`);
        console.log(`MongoDB connected successfully`);
    }
    catch (err) {
        console.error(err);
    }
};
exports.connectDatabase = connectDatabase;
