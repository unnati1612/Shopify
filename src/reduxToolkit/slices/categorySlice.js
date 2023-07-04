import { createSlice } from "@reduxjs/toolkit"
import { getCategoryList, getProductByCategory } from "../actions/categoryAction";

const initialState={
    isLoading:false,
    isSuccess:false,
    data:[],
    prodByCat:[]
}



const categorySlice=createSlice({
    name:"categoryList",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getCategoryList.pending,(state)=>{
            state.isLoading=true;
        })
        .addCase(getCategoryList.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isSuccess=true;
            state.data=action.payload
        })
        .addCase(getCategoryList.rejected,(state)=>{
            state.isLoading=false;
            state.isSuccess=false;
        })
        .addCase(getProductByCategory.pending,(state)=>{
            state.isLoading=true;
        })
        .addCase(getProductByCategory.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isSuccess=true;
            state.prodByCat=action.payload
        })
        .addCase(getProductByCategory.rejected,(state)=>{
            state.isLoading=false;
            state.isSuccess=false;
        })
    }
})


export default categorySlice.reducer