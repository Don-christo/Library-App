import mongoose from "mongoose";


export const connectDatabase = async () => {
    try{
        const connect = mongoose.connect(`mongodb+srv://Donchristo:dbUserPassword@cluster0.xm6ncbq.mongodb.net/exams`);
        console.log(`MongoDB connected successfully`);
    }catch(err) {
        console.error(err);
    }
}