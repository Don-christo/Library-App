import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorization = req.headers.authorization;
        if (authorization === undefined) {
            return res.status(401).send({
                status: "Error",
                message: 'You are not authorized!!!'

            })
        }

        const pin = authorization.split(" ")[1]
        if (!pin || pin === "") {
            return res.status(401).send({
                status: "Error",
                message: `Programming error`
            })
        }
        const decoded = jwt.verify(pin, "mySecret")

        if ("user" in req) {
            req.user = decoded
        }

        return next();
    } catch (error) {
        console.log(error)
    }
}


