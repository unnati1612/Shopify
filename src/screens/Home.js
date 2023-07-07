import React, { useEffect, useState } from 'react'
import CarouselHome from '../components/CarouselHome'
import SearchBar from '../components/SearchBar'
import Product from '../components/Product'
import { useDispatch, useSelector } from 'react-redux'
import { latestProductList } from '../reduxToolkit/actions/productAction'
import { getCategoryList } from '../reduxToolkit/actions/categoryAction'
import CategoryHome from '../components/category/CategoryHome'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'
import { getLoginStatus } from '../reduxToolkit/slices/loginSlice'

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

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 4,
    initialSlide: 0,
    autoplay:false,
    arrows: true,
    // prevArrow:<ArrowLeft />,
    // nextArrow:<ArrowRight />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          initialSlide: 2,
          dots: false,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: false,
        }
      }
    ]
  }


  return (
    <div className='d-flex align-items-center flex-column text-center'>
    <div className=' container' >
    <CarouselHome />
    <div className='mt-5'>
    <div className='d-flex justify-content-between container'>
    <h2 className='mb-4 ms-4'>Categories</h2>
    <Link to="/category" className='mb-4'>View All</Link>

    </div>
    <Slider {...settings}>
    {
      categories?.map((category)=>(
        <CategoryHome category={category}/>
          ))
    }      
    </Slider>
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