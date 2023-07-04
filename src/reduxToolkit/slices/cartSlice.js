import { createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify";

const initialState={
    products:[],
    totalItems:0,
    totalPrice:0
}


const cartSlice=createSlice({
    name:"cart",
    initialState,
    reducers:{
        addToCart:(state,action)=>{

            toast.success('Added to Cart!', {
                position: "bottom-right",
                autoClose: 3000,
        toastId:action.payload.item.id,

                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
            console.log(action.payload)
            let index=state.products.findIndex((item)=>(
                item.id==action.payload.item.id
            ))
            if(index==-1){
                state.products=[...state.products,{...action.payload.item,qty:parseInt(action.payload.qty)}]
                state.totalItems=state.products.length;
                state.totalPrice+=(action.payload.item.price*action.payload.qty);
                console.log(state.products)
            }
            else{
                state.products[index].qty+=parseInt(action.payload.qty);
                state.totalPrice+=state.products[index].price*action.payload.qty;

            }
        },
        increment:(state,action)=>{
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
                cartSlice.caseReducers.removeFromCart(state,action)
            }
        },
        removeFromCart:(state,action)=>{
            let index=state.products.findIndex((item)=>(
                item.id==action.payload.id
            ))
            state.totalPrice-=(action.payload.price*state.products[index].qty);
            state.products.splice(index,1);
            state.totalItems=state.products.length;
            toast.error('Removed From Cart!', {
                position: "bottom-right",
                autoClose: 3000,
            toastId:action.payload.id,

                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
        }
    }
})


export const {addToCart,increment,decrement,removeFromCart}=cartSlice.actions
export default cartSlice.reducer;
