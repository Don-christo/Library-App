"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (req, res, next) => {
    try {
        const authorization = req.headers.authorization;
        if (authorization === undefined) {
            return res.status(401).send({
                status: "Error",
                message: 'You are not authorized!!!'
            });
        }
        const pin = authorization.split(" ")[1];
        if (!pin || pin === "") {
            return res.status(401).send({
                status: "Error",
                message: `Programming error`
            });
        }
        const decoded = jsonwebtoken_1.default.verify(pin, "mySecret");
        if ("user" in req) {
            req.user = decoded;
        }
        return next();
    }
    catch (error) {
        console.log(error);
    }
};
exports.authMiddleware = authMiddleware;
