import mongoose, { Schema } from "mongoose";
import Joi from "joi";

export interface IUser {
    _id: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    role: string,
    books: [Record<string, string>]
}

const userSchema = new Schema({
    firstName: {
        type: String,
        require: [true, `Please input first name`]
    },
    lastName: {
        type: String,
        require: [true, `Please input last name`]
    },
    email: {
        type: String,
        require: [true, `Please input email address`]
    },
    password: {
        type: String,
        require: [false]
    },
    role: {
        type: String,
        require: [false]
    },
    books: {
        type: Array,
        require: [false]
    }
})

const User = mongoose.model<IUser>('User', userSchema);

export default User;

export const validateUser = (user: Partial<IUser>) => {
    const schema = Joi.object({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().optional(),
      role: Joi.string().optional(),
      books: Joi.array().items(Joi.object()).optional(),
    });
  
    return schema.validate(user);
  };
  