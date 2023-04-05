import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearError, getProduct } from "../../actions/productAction";
import Loader from "../Layout/Loader/Loader";
import Product from "../Home/Product";
import "./Products.css";
import { useParams } from "react-router-dom";
function Products() {
  const {keyword}=useParams()
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);
  useEffect(() => {
    dispatch(getProduct(keyword));
    console.log(keyword);
  }, [dispatch,keyword]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <h2 className="productsHeading">Products</h2>
          <div className="products">
            {products &&
              products.map((product) => (
                <Product key={product._id} product={product}></Product>
              ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}

export default Products;
