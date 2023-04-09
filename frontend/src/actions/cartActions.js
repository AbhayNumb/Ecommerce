import axios from "axios";

//add to cart
export const addItemToCart = (id, quantity) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/v1/product/${id}`);
  console.log(data);
  dispatch({
    type: "add_to_cart",
    payload: {
      product: id,
      name: data.product.name,
      price: data.product.price,
      image: data.product.images[0].url,
      stock: data.product.Stock,
      quantity,
    },
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

//remove from cart
export const removeCartItem = (id) => async (dispatch, getState) => {
  dispatch({
    type: "remove_cart_item",
    payload: id,
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

//save shipping info
export const saveShippingInfo = (data) => async (dispatch) => {
  dispatch({
    type: "save_shipping_info",
    payload: data,
  });
  localStorage.setItem("shippingInfo", JSON.stringify(data));
};
