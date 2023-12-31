import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./slices/productSlice";
import categorySlice from "./slices/categorySlice";
import cartSlice from "./slices/cartSlice";
import wishlistSlice from "./slices/wishlistSlice";
import loginSlice from "./slices/loginSlice";



export const store=configureStore({
    reducer:{
        products:productSlice,
        categories:categorySlice,
        cart:cartSlice,
        wishlist:wishlistSlice,
        login:loginSlice,
    }
})