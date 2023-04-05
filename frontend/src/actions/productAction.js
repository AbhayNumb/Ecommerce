import axios from "axios";
export const getProduct =
  (keyword = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: "all_product_request" });
      let link = `/api/v1/products?keyword=${keyword}`;
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

//clearing errors
export const clearError = () => async (dispatch) => {
  dispatch({ type: "clear_error" });
};
