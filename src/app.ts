import express from "express";
import dotenv from "dotenv";
import cookieparser from "cookie-parser";
import logger from "morgan";
import { connectDatabase } from "./config/database";
import userRoutes from "./routes/userRoutes"
import bookRoutes from "./routes/bookRoutes";


dotenv.config();

const app = express();

connectDatabase();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieparser());
app.use(logger('dev'));

app.use('/books', bookRoutes);
app.use('/users', userRoutes);

const port = process.env.PORT;


app.listen(port || 4000, () => {
    console.log(`App is listening on port ${port || 4000}`);
});

export default app;



// Donchristo
// dbUserPassword