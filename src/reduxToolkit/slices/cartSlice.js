import { createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify";




const initialState={
    products:[],
    totalItems:0,
    totalPrice:0,
}


const cartSlice=createSlice({
    name:"cart",
    initialState,
    reducers:{
        setCartDetails:(state)=>{
            let loginUser=localStorage.getItem('loginUser')

            let users=localStorage.getItem('users')?JSON.parse(localStorage.getItem('users')):[]
             let indexUser=users?.findIndex((user)=>(
                  user.email==loginUser
                ))
            // console.log(loginUser)
            let cart=users[indexUser]?.cart?users[indexUser]?.cart:[]
            state.products=cart
            state.totalItems=cart.length
            state.totalPrice=users[indexUser]?.totalPrice?users[indexUser]?.totalPrice:0
        },
        addToCart:(state,action)=>{
            let loginUser=localStorage.getItem('loginUser')

            let users=localStorage.getItem('users')?JSON.parse(localStorage.getItem('users')):[]
             let indexUser=users?.findIndex((user)=>(
                  user.email==loginUser
                ))
            
            toast.success('Added to Cart!', {
                position: "bottom-right",
                autoClose: 1000,
        toastId:action.payload.item.id,

                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
            // console.log(action.payload)
            let index=state.products.findIndex((item)=>(
                item.id==action.payload.item.id
            ))
            if(index==-1){
                state.products=[...state.products,{...action.payload.item,qty:parseInt(action.payload.qty)}]
                state.totalItems=state.products.length;
                state.totalPrice+=(action.payload.item.price*action.payload.qty);
                // console.log(state.products)
                users[indexUser].totalPrice=state.totalPrice
                users[indexUser]?.cart?.push({...action.payload.item,qty:parseInt(action.payload.qty)})
                localStorage.removeItem('users');
                localStorage.setItem('users',JSON.stringify(users))
            }
            else{
                state.products[index].qty+=parseInt(action.payload.qty);
                state.totalPrice+=state.products[index].price*action.payload.qty;
                users[indexUser].totalPrice=state.totalPrice
                localStorage.removeItem('users');
                localStorage.setItem('users',JSON.stringify(users))
            }
        },
        increment:(state,action)=>{
            let loginUser=localStorage.getItem('loginUser')

            let users=localStorage.getItem('users')?JSON.parse(localStorage.getItem('users')):[]
             let indexUser=users?.findIndex((user)=>(
                  user.email==loginUser
                ))
            let index=state.products.findIndex((item)=>(
                item.id==action.payload.id
            ))
            state.products[index].qty+=1;
            state.totalPrice+=state.products[index].price;
            state.totalItems=state.products.length;
            let cartIndex=users[indexUser]?.cart.findIndex((product)=>(
                product.id==action.payload.id
              ));
              users[indexUser].totalPrice=state.totalPrice
              
              users[indexUser].cart.splice(cartIndex, 1);
              users[indexUser].cart.push(state.products[index])
              localStorage.removeItem('users');
              localStorage.setItem('users',JSON.stringify(users))
        },
        decrement:(state,action)=>{
            let loginUser=localStorage.getItem('loginUser')

            let users=localStorage.getItem('users')?JSON.parse(localStorage.getItem('users')):[]
             let indexUser=users?.findIndex((user)=>(
                  user.email==loginUser
                ))
            let index=state.products.findIndex((item)=>(
                item.id==action.payload.id
            ))
            if(state.products[index].qty>1){
            state.products[index].qty-=1;
            state.totalPrice-=action.payload.price;
            state.totalItems=state.products.length;
            let cartIndex=users[indexUser]?.cart.findIndex((product)=>(
                product.id==action.payload.id
              ));
              users[indexUser].totalPrice=state.totalPrice

              users[indexUser].cart.splice(cartIndex, 1);
              users[indexUser].cart.push(state.products[index])
              localStorage.removeItem('users');
              localStorage.setItem('users',JSON.stringify(users))

            }
            else{
                cartSlice.caseReducers.removeFromCart(state,action)
            }
        },
        removeFromCart:(state,action)=>{
            let loginUser=localStorage.getItem('loginUser')

            let users=localStorage.getItem('users')?JSON.parse(localStorage.getItem('users')):[]
             let indexUser=users?.findIndex((user)=>(
                  user.email==loginUser
                ))
            let index=state.products.findIndex((item)=>(
                item.id==action.payload.id
            ))
            state.totalPrice-=(action.payload.price*state.products[index].qty);
            state.products.splice(index,1);
            state.totalItems=state.products.length;
            let cartIndex=users[indexUser].cart.findIndex((product)=>(
                product.id==action.payload.id
            ))
            users[indexUser].totalPrice=state.totalPrice

                users[indexUser].cart.splice(cartIndex,1);
                localStorage.removeItem('users');
                localStorage.setItem('users',JSON.stringify(users))
            toast.error('Removed From Cart!', {
                position: "bottom-right",
                autoClose: 1000,
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


export const {setCartDetails,addToCart,increment,decrement,removeFromCart}=cartSlice.actions
export default cartSlice.reducer;
