import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import Product from "./Product.jsx";
import MetaDeta from "../Layout/MetaDeta";
import { clearError, getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../Layout/Loader/Loader";
import { useAlert } from "react-alert";
const Home = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, error, products } = useSelector((state) => state.products);
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaDeta title="ECOMMERCE"></MetaDeta>
          <div className="banner">
            <p>Welcome to Ecommerce</p>
            <h1>FIND AMAZING PRODCUCTS BELOW</h1>
            <a href="#container">
              <button>
                Scroll
                <CgMouse />
              </button>
            </a>
          </div>
          <div className="homeHeading">Featured Products</div>
          <div className="container" id="container">
            {products &&
              products.map((product) => <Product product={product} />)}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
