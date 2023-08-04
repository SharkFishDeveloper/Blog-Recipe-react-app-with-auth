import express from 'express';
import mongoose from 'mongoose';
import  {RecipeModal}  from '../models/Recipes.js';

const router = express.Router();
router.get("/",async(req,res)=>{
    try{
        const response = await RecipeModal.find({}); 
        res.json(response);
    }
    catch(err){
        res.json(err);
    }
});

router.post("/",async(req,res)=>{
    const recipe = new RecipeModal(req.body);
    try{
        const response = await recipe.save();
        res.json(response);
    }catch(err){
        res.json(err);
    }
});





export {router as recipeRouter};