import { createSlice } from "@reduxjs/toolkit"
import { fetchProductById, getProductList, latestProductList, searchProductList } from "../actions/productAction";

const initialState={
    isLoading:false,
    isSuccess:false,
    data:[],
    productDetails:{}
}

const productSlice=createSlice({
    name:"productList",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getProductList.pending,(state)=>{
            state.isLoading=true;
        })
        .addCase(getProductList.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isSuccess=true;
            state.data=action.payload
        })
        .addCase(getProductList.rejected,(state)=>{
            state.isLoading=false;
            state.isSuccess=false;
        })
        .addCase(latestProductList.pending,(state)=>{
            state.isLoading=true;
        })
        .addCase(latestProductList.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isSuccess=true;
            state.data=action.payload
        })
        .addCase(latestProductList.rejected,(state)=>{
            state.isLoading=false;
            state.isSuccess=false;
        })
        .addCase(searchProductList.pending,(state)=>{
            state.isLoading=true;
        })
        .addCase(searchProductList.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isSuccess=true;
            state.data=action.payload
        })
        .addCase(searchProductList.rejected,(state)=>{
            state.isLoading=false;
            state.isSuccess=false;
        })
        .addCase(fetchProductById.pending,(state)=>{
            state.isLoading=true;
        })
        .addCase(fetchProductById.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isSuccess=true;
            state.productDetails=action.payload
        })
        .addCase(fetchProductById.rejected,(state)=>{
            state.isLoading=false;
            state.isSuccess=false;
        })
    }
})


export default productSlice.reducer