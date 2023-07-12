import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addToCart } from '../reduxToolkit/slices/cartSlice';
import { decrement, increment, removeFromWishlist } from '../reduxToolkit/slices/wishlistSlice';

const WishlistProduct = ({item}) => {
    let dispatch=useDispatch();
  let qty=item.qty;
  
  return (
    <div className='row mb-3'>
    <div className='col-md-3 col-5 border rounded-3 p-0 ' style={{height:"120px"}}>
    <img style={{width:"100%" , height:"100%"}} src={item.thumbnail}/>
    </div>
    <div className='col-md-5 col-7 border d-flex flex-md-column justify-content-around align-items-center'>
    <h5 >{item.title}</h5>
    <p>Rs. {item.price}</p>
    <div className="d-flex justify-content-center align-items-start ">
    <button className="btn btnqty btn-sm me-2"  onClick={()=>dispatch(decrement(item))}> - </button>
    <p>{item.qty}</p>
    <button className="btn btnqty btn-sm ms-2"  onClick={()=>dispatch(increment(item))}> + </button>
    </div>
    </div>
    <div className='col-md-4 col-12 border d-flex flex-md-column justify-content-around align-items-center '>
    <button className='btn btn-primary m-2' onClick={()=>{dispatch(addToCart({item,qty})) ;dispatch(removeFromWishlist(item))
      } }>Add To Cart</button>
    <button className='btn btn-danger m-2' onClick={()=>dispatch(removeFromWishlist(item))}>Remove</button>
    </div>
    </div>
  )
}

export default WishlistProduct