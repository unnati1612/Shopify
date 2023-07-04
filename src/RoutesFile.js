

import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './screens/Home'
import Products from './screens/Products'
import Categories from './screens/Categories'
import ProductByCategory from './screens/ProductByCategory'
import Cart from './screens/Cart'
import Wishlist from './screens/Wishlist'
import Login from './screens/Login'
import SignUp from './screens/SignUp'
import ProductView from './screens/ProductView'
const RoutesFile = () => {
  return (
    <Routes>
    <Route path="/" element=<Home />/> 
    <Route path="/products" element=<Products/>/>    
    <Route path="/category" element=<Categories/>/>    
    <Route path="/category/:category" element=<ProductByCategory/>/>    
    <Route path="/cart" element=<Cart/>/>    
    <Route path="/wishlist" element=<Wishlist />/>    
 <Route path="/login" element=<Login />/>    
    <Route path="/signup" element=<SignUp />/>   
    <Route path="/products/:id" element =<ProductView />/> 

    </Routes>
  )
}

export default RoutesFile