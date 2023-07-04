import React from "react";
import { Link } from "react-router-dom";

const CategoryHome = ({ category }) => {
  return (
   <Link to={`/category/${category}`}  className=' text-decoration-none container categorybox rounded-circle border d-flex align-items-center justify-content-center'  style={{ width: "150px", height: "150px" }}>
  
      <h5 className="text-capitalize">{category}</h5>
   </Link>
  );
  
};

export default CategoryHome;
