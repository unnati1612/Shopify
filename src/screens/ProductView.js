import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { fetchProductById, getProductList } from '../reduxToolkit/actions/productAction';
import axios from 'axios';
import { addToCart } from '../reduxToolkit/slices/cartSlice';
import { getProductByCategory } from '../reduxToolkit/actions/categoryAction';
import Product from '../components/Product';
import { addToWishlist, removeFromWishlist } from '../reduxToolkit/slices/wishlistSlice';

const ProductView = () => {
  let params = useParams();
  let dispatch = useDispatch();
  const [qty, setQty] = useState(1);

  let item = useSelector(state => state.products.productDetails)
  let relatedProducts = useSelector(state => state.categories.prodByCat.products);
  console.log("related productsss", relatedProducts)
  let wishlistItems = useSelector(state => state.wishlist.products)

  useEffect(() => {
    window.scrollTo(0,0);
    dispatch(fetchProductById(params.id))
  }, [params.id])


  let category = item.category
  console.log(category)
  useEffect(() => {
    dispatch(getProductByCategory(category))
  }, [category])
  const imageChange=(url)=>{
   let thumbnail= document.getElementById('thumbnail');
   thumbnail.src=url;
  }
  return (
    <div className='container  '>
      <div className='row mt-2'>
        <div className='col-md-6 col-12 border d-flex justify-content-around align-items-center flex-md-row flex-column'>
          <div className='d-flex flex-md-column align-items-center flex-row flex-wrap '>
            {
              item?.images?.map((imgurl) => (
                <div style={{ width: "100px", height: "90px" }} className='mb-2 border cursor-pointer ' onClick={()=>imageChange(imgurl)}>
                  <img src={imgurl} style={{ width: "100%", height: "100%" }} />
                </div>
              ))
            }
          </div>

          <img src={item?.thumbnail} style={{ width: "50%", height: "50%" }} id="thumbnail"/>

        </div>
        <div className='col-md-6 col-12 border text-wrap text-break d-flex flex-column justify-content-center ps-5'>
          <h3>{item.title}</h3>
          <div className='mb-3'>
            <label for="qty">Select Quantity : </label>
            <input name="qty" type='number' min='1' value={qty} onChange={(e) => setQty(e.target.value)} className='form-control  d-inline-block mx-3' style={{ width: "70px" }} />
          </div>
          <p>
            <strong className='me-1'>Rs. {item?.price} </strong>
            <del className="text-secondary">
              Rs.{" "}
              {parseFloat(
                item?.price + item?.discountPercentage * item?.price
              ).toFixed(0)}
              .
            </del>{" "}
          </p>
          <small className="text-danger" style={{ marginTop: "-16px" }}>
            <i>{item.discountPercentage}% OFF!</i>
          </small>
          <div className='my-3'>
            {
              wishlistItems?.findIndex(element => (
                element.id == item.id
              )) == -1 ?
                <button className='btn likebtn me-3 ' onClick={() => dispatch(addToWishlist({ item, qty }))}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-heart me-1"
                    viewBox="0 0 16 16"
                  >
                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                  </svg>Wishlist</button>
                :


                <button className='btn likebtn me-3 ' onClick={() => dispatch(removeFromWishlist(item))}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-fill me-1" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                  </svg>
                  Wishlisted</button>
            }

            <button className='btn btn-primary ms-3 ' onClick={() => dispatch(addToCart({ item, qty }))}>Add To Cart</button>
          </div>
          <div className='text-break' >{item?.description}</div>
        </div>
      </div>
      <h4 className='my-4 text-center'>RELATED PRODUCTS</h4>
      <div className='row'>
        {
          relatedProducts?.map(element => (
           
              <div className="col-md-4 col-sm-6 col-12" key={item.id}>
              <Product item={element} />
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default ProductView