import axios from "axios";
export const getProduct = () => async (dispatch) => {
  try {
    dispatch({ type: "all_product_request" });
    const { data } = await axios.get("/api/v1/products");
    dispatch({ type: "all_product_success", payload: data });
  } catch (error) {
    dispatch({
      type: "all_product_fail",
      payload: error.response.data.message,
    });
  }
};
//clearing errors
export const clearError = () => async (dispatch) => {
  dispatch({ type: "clear_error" });
};
