import React, { Fragment, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { clearError, getProductDetails } from "../../actions/productAction";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Loader from "../Layout/Loader/Loader";
import { Paper, Button } from "@material-ui/core";
import ReactStars from "react-rating-stars-component";
import ReviewCard from "./ReviewCard";
import { useAlert } from "react-alert";
import MetaDeta from "../Layout/MetaDeta";
const useStyles = makeStyles((theme) => ({
  root: {
    margin: "auto",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  image: {
    width: "100%",
    height: "23rem",
    objectFit: "contain",
  },
}));

const ProductDetails = ({ match }) => {
  const alert = useAlert();
  const classname = useStyles();
  const [carouselIndex, setCarouselIndex] = useState(0);

  const handleCarouselChange = (index) => {
    setCarouselIndex(index);
  };
  const dispatch = useDispatch();
  let { id } = useParams();
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id, error, alert]);
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "#e4815d",
    value: product && product.ratings,
    size: window.innerWidth < 600 ? 20 : 25,
    isHalf: true,
  };
  const classes = useStyles();

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaDeta title={`${product.name} -- ECOMMERCE`} />
          <div className="ProductDetails">
            <div>
              <Carousel
                autoPlay
                className={classname.root}
                animation="slide"
                // in milliseconds
                easing="linear"
                autoPlayTimeout={5000}
                index={carouselIndex}
                onChange={handleCarouselChange}
              >
                {product.images.map((item, index) => (
                  <Paper key={index} style={{ boxShadow: "none" }}>
                    <img
                      className={classname.image}
                      src={item.url}
                      alt={`image-${index}`}
                      style={{ boxShadow: "none" }}
                    />
                  </Paper>
                ))}
              </Carousel>
            </div>
            <div>
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
              </div>
              <div className="detailsBlock-2">
                <ReactStars {...options} />
                <span>({product.numOfReviews}) Reviews</span>
              </div>
              <div className="detailsBlock-3">
                <h1>{`₹${product.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button>-</button>
                    <input value="1" type="number" />
                    <button>+</button>
                  </div>{" "}
                  <button>Add to Cart</button>
                </div>
                <p>
                  Status:{" "}
                  <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                    {product.Stock < 1 ? "OutOfStock" : "InStocks"}
                  </b>
                </p>
              </div>
              <div className="detailsBlock-4">
                Description: <p>{product.description}</p>
              </div>
              <button className="submitReview">Submit Review</button>
            </div>
          </div>
          <h3 className="reviewHeading">Reviews</h3>
          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews.map((review) => (
                <ReviewCard review={review} />
              ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;
