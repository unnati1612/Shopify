import React from 'react'
import { useDispatch } from 'react-redux'
import { decrement, increment, removeFromCart } from '../reduxToolkit/slices/cartSlice'
import { addToWishlist } from '../reduxToolkit/slices/wishlistSlice'

const CartProduct = ({item}) => {
    let dispatch=useDispatch()
    const handleWishlist = ()=>{
      let qty=item.qty
      dispatch(addToWishlist({item,qty}));
      dispatch(removeFromCart(item))
    }
  return (
    <div className='row mb-3'>
    <div className='col-2 border p-0'>
    <img src={item?.thumbnail} style={{width:"100%", height:"100px"}} />
    </div>
    <div className='col-6 border  d-flex flex-column justify-content-around '>
    <h5 className='ms-3'>{item?.title}</h5>
    <div className='d-flex justify-content-around'>
    <button className='btn btn-danger' onClick={()=>dispatch(removeFromCart(item))}>Remove Item</button>
    <button className='btn likebtn' onClick={()=>{handleWishlist()}}>Move to Wishlist</button>
    </div>    
    </div>
    <div className='col-4 border d-flex flex-column justify-content-around align-items-center pt-2'>
    <div className='d-flex justify-content-center' style={{height:"30px"}}>
    <button className='btn btn-secondary me-2 btn-sm' onClick={()=>dispatch(decrement(item))}> - </button>
    <p>{item?.qty}</p>
    <button className='btn btn-secondary ms-2 btn-sm' onClick={()=>dispatch(increment(item))}> + </button>
   
    </div>
    <div>
    <p>Rs.{item?.price} x {item?.qty} = Rs. {parseFloat((item?.price)*(item?.qty)).toFixed(2)}</p>
    </div>
    </div>
    
    </div>
  )
}

export default CartProduct