import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const getCategoryList=createAsyncThunk('categoryList/getCategoryList',async(req,{rejectWithValue})=>{
    try{
        const res=await axios.get(`https://dummyjson.com/products/categories`)
        // console.log("category" ,res.data)
        return res.data
    }
    catch(err){
        console.log(err.message)
    }
})

export const getProductByCategory=createAsyncThunk('categoryList/getProductByCategory',async(category,{rejectWithValue})=>{
    
    try{
        console.log("category",category)
        const res=await axios.get(`https://dummyjson.com/products/category/${category}`)
       console.log("product by category",res.data);
        return res.data
    }
    catch(err){
        console.log(err.message)
    }
})