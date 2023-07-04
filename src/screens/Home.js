import React, { useEffect, useState } from 'react'
import CarouselHome from '../components/CarouselHome'
import SearchBar from '../components/SearchBar'
import Product from '../components/Product'
import { useDispatch, useSelector } from 'react-redux'
import { latestProductList } from '../reduxToolkit/actions/productAction'
import { getCategoryList } from '../reduxToolkit/actions/categoryAction'
import CategoryHome from '../components/category/CategoryHome'
import { Link } from 'react-router-dom'

const Home = () => {

  let dispatch=useDispatch();
  const [latestProducts,setLatestProducts]=useState([])
  const [categories,setCategories]=useState([])

  useEffect(()=>{
    dispatch(latestProductList())
    dispatch(getCategoryList())
  },[])
  let latestProductsList=useSelector(state=>state.products)
  let categoriesList=useSelector(state=>state.categories)
  let data=[]
  useEffect(()=>{
    if(latestProductsList?.data?.length>0)
    setLatestProducts(latestProductsList.data)
  },[latestProductsList])
  useEffect(()=>{
    if(categoriesList?.data?.length>0){
    setCategories(categoriesList.data)
  //  data=categories.slice(0,6)

    }
  },[categoriesList])
  return (
    <div className='d-flex align-items-center flex-column text-center'>
    <div className='border container' >
    <CarouselHome />
    <div className='mt-5'>
    <div className='d-flex justify-content-between container'>
    <h2 className='mb-4 ms-4'>Categories</h2>
    <Link to="/category" className='mb-4'>View More</Link>

    </div>
    <div className='container d-flex justify-content-around flex-wrap'>  
    {
      categories?.slice(0,6).map((category)=>(
    <CategoryHome category={category}/>
      ))
      
    }
   


    </div>

    <h2 className='my-5'>Latest Products</h2>
    <div className=' border row'>
    {
      latestProducts?.map((item)=>(
        <div className="col-md-4 col-sm-6 col-12">
        <Product item={item} />
        </div>
      ))
    }

    </div>
    </div>
    </div>
    </div>
  )
}

export default Home