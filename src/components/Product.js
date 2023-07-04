import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../reduxToolkit/slices/cartSlice";
import { addToWishlist, removeFromWishlist } from "../reduxToolkit/slices/wishlistSlice";
import { Link } from "react-router-dom";

const Product = ({ item }) => {
  let dispatch = useDispatch();
  let [qty, setQty] = useState(1);
  let wishlistItems=useSelector(state=>state.wishlist.products);

  const handleDecrement = (e) => {
    qty > 1 ? setQty(qty - 1) : setQty(qty);
  };
  
  // console.log('wishlist==>',wishlistItems)

  return (
    <div>

      <div className="card mb-3 bg-light ">
      <Link to={`/products/${item?.id}`} className="text-decoration-none linkdiv">
        <div style={{ height: "200px" }}>
          <img
            src={item.thumbnail}
            style={{ height: "100%" }}
            className="card-img-top img-thumbnail"
            alt="..."
          />
        </div>
        <div className="card-body">
          {item?.title?.length > 25 ? (
            <h5 className="card-title text-decoration-none" >
              {" "}
              {item?.title?.substring(0, 24) + "..."}
            </h5>
          ) : (
            <h5 className="card-title">{item?.title}</h5>
          )}

          <div className="row " style={{ height: "70px" }}>
            {item?.description && item?.description?.length > 65 ? (
              <p> {item?.description?.substring(0, 55) + "..."}</p>
            ) : (
              <p>{item?.description}</p>
            )}
          </div>
          <div className="d-flex justify-content-between">
            <p>
              <strong>Rs. {item?.price} </strong>
              <del className="text-secondary">
                Rs.{" "}
                {parseFloat(
                  item?.price + item?.discountPercentage * item?.price
                ).toFixed(0)}
                .
              </del>{" "}
            </p>
            <p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="	#e6e619"
                className="bi bi-star-fill"
                viewBox="0 0 16 16"
              >
                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
              </svg>
              {item?.rating}
            </p>
          </div>
          </div>        

          <div className="d-flex justify-content-between">
            <small className="text-danger ms-3" style={{ marginTop: "-26px" }}>
              <i>{item.discountPercentage}% OFF!</i>
            </small>
            <p className="text-danger mb-0">Only {item?.stock} left </p>
          </div>
    </Link>
          <div className="d-flex justify-content-center align-items-start ">
            <button
              className="btn btnqty btn-sm me-2"
              onClick={(e) => handleDecrement(e)}
            >
              {" "}
              -{" "}
            </button>
            <p>{qty}</p>
            <button
              className="btn btnqty btn-sm ms-2"
              onClick={() => setQty(qty + 1)}
            >
              {" "}
              +{" "}
            </button>
          </div>
          <div className="d-flex justify-content-between p-3">
          {
            wishlistItems.findIndex(element=>(
              element.id==item.id
            ))==-1?
            <button
              onClick={() => dispatch(addToWishlist({ item, qty }))}
              className="btn likebtn"
            >           
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-heart me-1"
                viewBox="0 0 16 16"
              >
                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
              </svg>
              Wishlist
            </button>
            :
            <button
              onClick={() => dispatch(removeFromWishlist(item))}
              className="btn likebtn"
            >      
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
          </svg> Wishlisted
            </button>
          }
            <button
              className="btn btn-primary"
              onClick={() => dispatch(addToCart({ item, qty }))}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    
  );
};

export default Product;
