import React, { Fragment } from 'react'
import CartProduct from '../components/CartProduct'
import { useSelector } from 'react-redux';
import cartImg from '../assets/empty-cart.27f25b05.svg'
import { Link } from 'react-router-dom';
const Cart = () => {
    let cartProducts=useSelector(state=>state.cart);
  return (
    <div className='container  mb-2 '>
    <h2 className='text-center mb-4'><i>Cart Details</i></h2>
    {
      cartProducts.products.length==0?
      <div className='d-flex flex-column justify-content-center align-items-center mt-5'>
      <img src={cartImg}/>
      <h4 className='mt-2 ms-4'>Time to start Shopping!</h4>

      <p className='mt-2 ms-4'>Empty Cart</p>
      <div className='d-flex '>
      <Link to="/wishlist" ><button className='btn likebtn ms-3 mt-2'>Go To Wishlist</button></Link>
      <Link to="/products" ><button className='btn btn-primary ms-3 mt-2'>Back to Shopping</button></Link>

      </div>
      </div>
      :
      <div className='row'>
    <div className='border col-8'>
    <h4 className='text-center my-3'>Cart Items</h4>
    <div className='px-2'>
    {
        cartProducts?.products.map((item)=>(
            <Fragment key={item.id}>
            <CartProduct item={item} />
            </Fragment>
        ))
    }
    </div>
    </div>
    <div className='border col-4'>
    <h4 className='text-center mb-3'>Summary</h4>
    <div className='px-4'>
    <div className='d-flex justify-content-between'>
    <p>Total Price: </p>
    <p>Rs. {parseFloat(cartProducts.totalPrice).toFixed(2)}/- </p>
    </div>
    <div className='d-flex justify-content-between'>
    <p>Tax: </p>
    <p>Rs. 10/- </p>
    </div>
    <div className='d-flex justify-content-between'>
    <p>Delivery Charges: </p>
    <p>Rs. 10/- </p>
    </div>
    <hr/>
    <div className='d-flex justify-content-around'>
    <p>Final Price: </p>
    <p>Rs. {parseFloat(cartProducts.totalPrice+20).toFixed(2)}/- </p>
    </div>
    </div>
    </div>
    </div>
    }
    
    </div>
  )
}

export default Cart