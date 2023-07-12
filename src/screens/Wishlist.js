import React, { Fragment, useEffect } from 'react'
import WishlistProduct from '../components/WishlistProduct'
import { useDispatch, useSelector } from 'react-redux'
import wishlistIcon from '../assets/empty-wishlist.f8e03702.svg'
import { Link } from 'react-router-dom'
import { getLoginStatus } from '../reduxToolkit/slices/loginSlice'
const Wishlist = () => {
    let wishlistItems=useSelector(state=>state.wishlist)
    let dispatch= useDispatch();
    useEffect(()=>{
      dispatch(getLoginStatus())
    },[])

    let loginStatus= useSelector(state=>state.login.loggedIn)
  return (
    <div className='container d-flex flex-column justify-content-around align-items-center'>
    <h3 className='text-center mt-3'>Wishlist</h3>
    {
      loginStatus?
      <>
      {
          wishlistItems.products.length==0?
        <div className='d-flex flex-column justify-content-center align-items-center mt-2'>
        <img src={wishlistIcon}/>
        <h4 className='mt-2 ms-4'>Time to fill the Wishlist!</h4>
        <p className='mt-2 ms-4'>Wishlist is Empty</p>
  
        <div className='d-flex '>
        <Link to="/products" ><button className='btn btn-primary ms-3 mt-2'>Back to Shopping</button></Link>
  
        </div>
        </div>
        :
        <div className='col-md-7 mt-3  container border-round '>
      {
          wishlistItems?.products?.map((item)=>(
            <Fragment key={item.id}>
              <WishlistProduct item={item}/>
               </Fragment>
          ))
      }
      </div>
  }
  
  </>
  :
  <h2 className='text-center text-primary my-4'>You Need to Login First!</h2>

    }
   
</div>
  )
}
export default Wishlist