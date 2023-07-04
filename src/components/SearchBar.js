import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  getProductList,
  searchProductList,
} from "../reduxToolkit/actions/productAction";
import { useDebouncedCallback } from "use-debounce";

const SearchBar = () => {
  let [searchText, setSearchText] = useState("");
  let dispatch = useDispatch();
  // const handleSearch = (text) => {
  //   // setSearchText(text);
  //   // // console.log(searchText)
  //   // if(text.length>2)
  //   // dispatch(searchProductList(text))
  //   // if(text.length==0)
  //   // {
  //   //   dispatch(getProductList())
  //   // }
  //   debounced(text)
  // };

  const handleSearch = useDebouncedCallback(
    // function
    (text) => {
      setSearchText(text);
      // console.log(searchText)
      if (text.length > 2) dispatch(searchProductList(text));
      if (text.length == 0) {
        dispatch(getProductList());
      }
    },
    // delay in ms
  500
  );
  return (
    <div style={{ width: "70%" }} className="d-flex mt-4">
      <input
        type="search"
        className="form-control bg-light"
        placeholder="Find Items.."
        onChange={(e) => handleSearch(e.target.value)}
      />
      
    </div>
  );
};

export default SearchBar;
