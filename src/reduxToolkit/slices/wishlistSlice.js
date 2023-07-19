import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";


const initialState={
    products:[],
    totalItems:0
}


const wishlistSlice=createSlice({
    name:"wishlist",
    initialState,
    reducers:{
      setWishlistDetails:(state)=>{
        let loginUser=localStorage.getItem('loginUser')

        let users=localStorage.getItem('users')?JSON.parse(localStorage.getItem('users')):[]
         let indexUser=users?.findIndex((user)=>(
              user.email==loginUser
            ))
        // console.log(loginUser)
        let wishlist=users[indexUser]?.wishlist?users[indexUser]?.wishlist:[]
        state.products=wishlist
        state.totalItems=wishlist.length
        state.totalPrice=users[indexUser]?.totalPrice?users[indexUser]?.totalPrice:0
    },
        addToWishlist:(state,action)=>{
            let loginUser=localStorage.getItem('loginUser')

let users=localStorage.getItem('users')?JSON.parse(localStorage.getItem('users')):[]
 let indexUser=users?.findIndex((user)=>(
      user.email==loginUser
    ))
          toast.info('Added to Wishlist!', {
            position: "bottom-right",
        toastId:action.payload.item.id,

            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
          let index= state.products.findIndex((item)=>(
            item.id==action.payload.item.id
          ))
          if(index==-1){
            state.products=[...state.products,{...action.payload.item,qty:action.payload.qty}];
            users[indexUser]?.wishlist?.push({...action.payload.item,qty:parseInt(action.payload.qty)})
                localStorage.removeItem('users');
                localStorage.setItem('users',JSON.stringify(users))
        }

          state.totalItems=state.products.length;
        
        },increment:(state,action)=>{
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

            let wishlistIndex=users[indexUser]?.wishlist.findIndex((product)=>(
                product.id==action.payload.id
              ));
              
              users[indexUser].wishlist.splice(wishlistIndex, 1);
              users[indexUser].wishlist.push(state.products[index])
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
            let wishlistIndex=users[indexUser]?.wishlist.findIndex((product)=>(
                product.id==action.payload.id
              ));
              
              users[indexUser].wishlist.splice(wishlistIndex, 1);
              users[indexUser].wishlist.push(state.products[index])
              localStorage.removeItem('users');
              localStorage.setItem('users',JSON.stringify(users))
            }
            else{
                wishlistSlice.caseReducers.removeFromWishlist(state,action)
          state.totalItems=state.products.length;

            }
        },
        removeFromWishlist:(state,action)=>{
            let loginUser=localStorage.getItem('loginUser')
            console.log(action.payload.title)
            let users=localStorage.getItem('users')?JSON.parse(localStorage.getItem('users')):[]
             let indexUser=users?.findIndex((user)=>(
                  user.email==loginUser
                ))
            let index= state.products.findIndex((item)=>(
                item.id==action.payload.id
              ))
              state.products.splice(index,1);
          state.totalItems=state.products.length;
          let wishlistIndex=users[indexUser].wishlist.findIndex((product)=>(
            product.id==action.payload.id
        ))
                users[indexUser].wishlist.splice(wishlistIndex,1);
                localStorage.removeItem('users');
                localStorage.setItem('users',JSON.stringify(users))
          toast.warn('Removed from Wishlist!', {
            position: "bottom-right",
        toastId:action.payload.id,

            autoClose: 1000,
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

export const {setWishlistDetails,addToWishlist,increment,decrement,removeFromWishlist}=wishlistSlice.actions
export default wishlistSlice.reducer;

