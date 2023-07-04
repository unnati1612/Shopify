import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"


export const getProductList= createAsyncThunk("productList/getProductList",async(req,{rejectWithValue})=>{
    try{
        const res=await axios.get(`https://dummyjson.com/products`)
        // console.log(res.data)
        return res?.data?.products
    }
    catch(err){
        rejectWithValue(err.message)
    }
})

export const latestProductList=createAsyncThunk("productList/latestProductList",async(req,{rejectWithValue})=>{
    try{
        const res=await axios.get(`https://dummyjson.com/products?limit=6&skip=5`)
        // console.log(res.data)
        return res?.data?.products
    }
    catch(err){
        rejectWithValue(err.message)
    }
})

export const searchProductList=createAsyncThunk("productList/searchProductList",async(text,{rejectWithValue})=>{
    try{
        const res=await axios.get(`https://dummyjson.com/products/search?q=${text}`)
        console.log(res.data)
        return res?.data?.products
    }
    catch(err){
        rejectWithValue(err.message)
    }
})

export const fetchProductById=createAsyncThunk("productById/fetchProductById",async(id,{rejectWithValue})=>{
    try{
        const res=await axios.get(`https://dummyjson.com/products/${id}`)
        console.log(res?.data)
        return res?.data
    }
    catch(err){
        rejectWithValue(err.message)
    }
})