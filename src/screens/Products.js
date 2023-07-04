import React, { useEffect, useState } from "react";
import Product from "../components/Product";
import { useDispatch, useSelector } from "react-redux";
import { getProductList } from "../reduxToolkit/actions/productAction";
import Form from "react-bootstrap/Form";
import {
  getCategoryList,
  getProductByCategory,
} from "../reduxToolkit/actions/categoryAction";
import Loader from "../components/Loader";
import SearchBar from "../components/SearchBar";
const Products = () => {
  const [productList, setProductList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [sortProducts, setSortProducts] = useState("");

  let productListSelector = useSelector((state) => state.products);
  let categoryListSelector = useSelector((state) => state.categories);
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductList());
    dispatch(getCategoryList());
  }, []);
  useEffect(() => {
    if (productListSelector?.data?.length > 0)
      setProductList(productListSelector.data);
    if (categoryListSelector?.data?.length > 0)
      setCategoryList(categoryListSelector.data);
  }, [productListSelector, categoryListSelector]);

  // Setting Product list by category
  useEffect(() => {
    if(categoryListSelector?.prodByCat?.products?.length>0){
      
      setSortProducts("")
      setProductList(categoryListSelector.prodByCat.products);
    }
  }, [categoryListSelector.prodByCat]);

  const handleSort=(value)=>{
    const lst = [...productList]
    setSortProducts(value)
          if(value=="lowtohigh" && lst.length>0){

           setProductList(lst?.sort((a,b)=> a.price-b.price));
          }
          if(value=="hightolow" && lst.length>0){
           setProductList(lst?.sort((a,b)=> b.price-a.price));
            }
  }
  return (
    <div className="d-flex align-items-center flex-column justify-content-center">
      <div className="container p-3">
        <h4 className="text-center">PRODUCTS</h4>
        <div className="d-flex justify-content-center mb-4">
          <SearchBar />
          </div>
        {
          productListSelector.isLoading||categoryListSelector.isLoading?
         <div className="text-center mt-5"> <Loader /></div>
          :
          <>
          
          <div className="d-flex justify-content-end"> 
          <div className=" mb-3 me-3">
            <Form.Select
              aria-label="Sort"
              className="bg-light"
              onChange={(e) => {
                if (e.target.value == "allproducts") {
                  dispatch(getProductList());
                } else {

                  dispatch(getProductByCategory(e.target.value));
                }
              }}
            >
              <option >Select Category</option>
  
              <option value="allproducts">All Products</option>
              {categoryList?.map((item,index) => (
                <option value={item} key={index}>{item}</option>
              ))}
            </Form.Select>
          </div>
          <div>
          <Form.Select aria-label="Default select example" value={sortProducts} onChange={(e)=>{handleSort(e.target.value)}}>
          <option value="">Sort by Price</option>
          <option value="lowtohigh">Low to High</option>
          <option value="hightolow">High to Low</option>
        </Form.Select>
          </div>
          </div>
          <div className="row ">
            {productList?.map((item) => (
              <div className="col-md-4 col-sm-6 col-12" key={item.id}>
                <Product item={item} />
              </div>
            ))}
          </div>
          </>
        }
       
      </div>
    </div>
  );
};

export default Products;
