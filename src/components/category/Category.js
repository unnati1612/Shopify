import React from "react";
import { Link } from "react-router-dom";
import { getProductByCategory } from "../../reduxToolkit/actions/categoryAction";

const Category = ({ category }) => {
  return (
    <Link to={`/category/${category}`} className=" text-decoration-none">
      <div
        className="border p-1 text-center d-flex align-items-center justify-content-center mb-3 rounded categorymain"
        style={{ height: "100px" }}
      >
        <h5 className="text-capitalize">{category}</h5>
      </div>
    </Link>
  );
};

export default Category;
