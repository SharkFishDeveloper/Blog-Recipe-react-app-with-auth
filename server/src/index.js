import express from "express";
import cors from "cors";
import mongoose from 'mongoose';
import {userRouter} from "./routes/users.js";
import { recipeRouter } from "./routes/recipes.js";
const app = express();
app.use(cors());
app.use(express.json());
app.use('/auth',userRouter); //* all request to { /auth } shall be handled by userRouter.
app.use("/recipes",recipeRouter);

mongoose.connect("mongodb+srv://receipesbook:We77wIfrNuupFoNy@receipes.c1yd8lx.mongodb.net/receipes?retryWrites=true&w=majority",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
});
    


app.listen(3001,()=>console.log("Started server"));