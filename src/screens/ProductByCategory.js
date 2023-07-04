import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductByCategory } from '../reduxToolkit/actions/categoryAction'
import { useParams } from 'react-router-dom'
import Product from '../components/Product'
import Loader from '../components/Loader'

const ProductByCategory = () => {
    let {category}=useParams()
    let dispatch=useDispatch()
  let productListSelector=useSelector(state=>state.categories)

  useEffect(()=>{
    if(category)
    console.log(category);
        dispatch(getProductByCategory(category))
  },[category])


  return (
    <div className='d-flex align-items-center flex-column text-center'>
    <div className='container p-3'>
    <h3 className='text-capitalize mb-4'>{category}</h3>
    {
      productListSelector.isLoading?
      <div className="text-center mt-5"> <Loader /></div>
      :
      <div className='row '>
    
      {
          productListSelector?.isLoading?"Loading":
          productListSelector.prodByCat.products?.map((item)=>(
            <div  className="col-md-4 col-sm-6 col-12" key={item.id}>
          <Product item={item}/>
          </div>
        ))
      }
     
  
      </div>
    }
   
    </div>
    </div>
  
  )
}

export default ProductByCategory