import axios from "axios";
export const getProduct =
  (keyword = "", currentPage = 1, price = [0, 25000], category, rating = 0) =>
  async (dispatch) => {
    try {
      dispatch({ type: "all_product_request" });
      let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${rating}`;
      if (category) {
        link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${rating}`;
      }
      const { data } = await axios.get(link);
      dispatch({ type: "all_product_success", payload: data });
    } catch (error) {
      dispatch({
        type: "all_product_fail",
        payload: error.response.data.message,
      });
    }
  };

export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: "product_details_request" });
    const { data } = await axios.get(`/api/v1/product/${id}`);
    dispatch({ type: "product_details_success", payload: data.product });
  } catch (error) {
    dispatch({
      type: "product_details_fail",
      payload: error.response.data.message,
    });
  }
};

export const newReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({ type: "new_review_request" });
    const config = {
      header: { "Content-Type": "application/json" },
    };
    const { data } = await axios.put(`/api/v1/review`, reviewData, config);
    dispatch({ type: "new_review_success", payload: data.success });
  } catch (error) {
    dispatch({
      type: "new_review_fail",
      payload: error.response.data.message,
    });
  }
};

export const getAdminProducts = () => async (dispatch) => {
  try {
    dispatch({ type: "admin_product_request" });
    const { data } = await axios.get("/api/v1/admin/products");
    dispatch({ type: "admin_product_success", payload: data });
  } catch (error) {
    dispatch({
      type: "admin_product_fail",
      payload: error.response.data.message,
    });
  }
};

//clearing errors
export const clearError = () => async (dispatch) => {
  dispatch({ type: "clear_error" });
};
