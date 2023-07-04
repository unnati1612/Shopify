import { createSlice } from "@reduxjs/toolkit";

const initialState={
    products:[],
    totalItems:0
}


const wishlistSlice=createSlice({
    name:"wishlist",
    initialState,
    reducers:{
        addToWishlist:(state,action)=>{
          let index= state.products.findIndex((item)=>(
            item.id==action.payload.item.id
          ))
          if(index==-1){
            state.products=[...state.products,{...action.payload.item,qty:action.payload.qty}];
          }
          state.totalItems=state.products.length;
        
        },increment:(state,action)=>{
            let index=state.products.findIndex((item)=>(
                item.id==action.payload.id
            ))
            state.products[index].qty+=1;
            state.totalPrice+=state.products[index].price;
            state.totalItems=state.products.length;

        },
        decrement:(state,action)=>{
            
            let index=state.products.findIndex((item)=>(
                item.id==action.payload.id
            ))
            if(state.products[index].qty>1){
            state.products[index].qty-=1;
            state.totalPrice-=action.payload.price;
            state.totalItems=state.products.length;
            }
            else{
                wishlistSlice.caseReducers.removeFromWishlist(state,action)
          state.totalItems=state.products.length;

            }
        },
        removeFromWishlist:(state,action)=>{
            let index= state.products.findIndex((item)=>(
                item.id==action.payload.id
              ))
              state.products.splice(index,1);
          state.totalItems=state.products.length;

        }

    }
})

export const {addToWishlist,increment,decrement,removeFromWishlist}=wishlistSlice.actions
export default wishlistSlice.reducer;

