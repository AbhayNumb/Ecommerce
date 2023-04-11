import axios from "axios";
export const createOrder = (order) => async (dispatch) => {
  try {
    dispatch({ type: "create_order_request" });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post("/api/v1/order/new", order, config);
    dispatch({ type: "create_order_success", payload: data });
  } catch (error) {
    dispatch({
      type: "create_order_fail",
      payload: error.response.data.message,
    });
  }
};
//oy ordes
export const myOrdes = () => async (dispatch) => {
  try {
    dispatch({ type: "my_order_request" });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get("/api/v1/order/me");
    dispatch({ type: "my_order_success", payload: data.orders });
  } catch (error) {
    dispatch({
      type: "my_order_fail",
      payload: error.response.data.message,
    });
  }
};

//clearing errors
export const clearError = () => async (dispatch) => {
  dispatch({ type: "clear_error" });
};
