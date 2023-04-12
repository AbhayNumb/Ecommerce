import React, { Fragment, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearError,
  getProductDetails,
  newReview,
} from "../../actions/productAction";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Loader from "../Layout/Loader/Loader";
import { Paper } from "@material-ui/core";
import ReactStars from "react-rating-stars-component";
import ReviewCard from "./ReviewCard";
import { useAlert } from "react-alert";
import MetaDeta from "../Layout/MetaDeta";
import { addItemToCart } from "../../actions/cartActions";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
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
  const [quantity, setQuantity] = useState(1);
  const increaseQuantity = () => {
    if (product.Stock <= quantity) {
      return;
    }
    const qty = quantity + 1;
    setQuantity(qty);
  };
  const decreaseQuantity = () => {
    if (1 >= quantity) {
      return;
    }
    const qty = quantity - 1;
    setQuantity(qty);
  };
  const addToCartHandler = () => {
    dispatch(addItemToCart(id, quantity));
    alert.success("Item Added To Cart");
  };

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
  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearError());
    }
    if (success) {
      alert.success("Review Submitted Successfully");
      dispatch({ type: "new_review_reset" });
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id, error, alert, reviewError, success]);
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "#e4815d",
    value: product && product.ratings,
    size: window.innerWidth < 600 ? 20 : 25,
    isHalf: true,
  };
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };
  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", id);

    dispatch(newReview(myForm));
    setOpen(false);
  };
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
                    <button onClick={decreaseQuantity}>-</button>
                    <input value={quantity} type="number" />
                    <button onClick={increaseQuantity}>+</button>
                  </div>{" "}
                  <button onClick={addToCartHandler}>Add to Cart</button>
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
              <button className="submitReview" onClick={submitReviewToggle}>
                Submit Review
              </button>
            </div>
          </div>
          <h3 className="reviewHeading">Reviews</h3>
          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />

              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>
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
