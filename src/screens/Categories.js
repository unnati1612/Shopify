import React, { useEffect, useState } from 'react'
import Category from '../components/category/Category'
import { useDispatch, useSelector } from 'react-redux'
import { getCategoryList } from '../reduxToolkit/actions/categoryAction'

const Categories = () => {
  const [categories,setCategories]=useState([])
  let dispatch=useDispatch();
  useEffect(()=>{
    dispatch(getCategoryList())
  },[])
  let categoriesList=useSelector(state=>state.categories)
  useEffect(()=>{
    if(categoriesList?.data?.length>0){
    setCategories(categoriesList.data)
      }
  },[categoriesList])
      
  return (
    <div className='container text-center'>
    <h3 className='my-3'>CATEGORIES</h3>
    <div className='row'>
    {
        categories?.map((item)=>(
          <div className='col-lg-2 col-md-3 col-4'>
          <Category category={item}/>
          </div>
        ))
        
    }
    </div>
    </div>
  )
}

export default Categories