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
//oy orders
export const myOrders = () => async (dispatch) => {
  try {
    dispatch({ type: "my_order_request" });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get("/api/v1/orders/me");
    dispatch({ type: "my_order_success", payload: data.order });
  } catch (error) {
    dispatch({
      type: "my_order_fail",
      payload: error.response.data.message,
    });
  }
};

//get OrderDetails
export const getOrderDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: "order_details_request" });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get(`/api/v1/order/${id}`);
    dispatch({ type: "order_details_success", payload: data.order });
  } catch (error) {
    dispatch({
      type: "order_details_fail",
      payload: error.response.data.message,
    });
  }
};

//clearing errors
export const clearError = () => async (dispatch) => {
  dispatch({ type: "clear_error" });
};
