import axios from "axios";

//login
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: "login_request" });
    // console.log(email, password);
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(
      `api/v1/login`,
      { email, password },
      config
    );
    dispatch({ type: "login_success", payload: data.user });
  } catch (error) {
    dispatch({
      type: "login_fail",
      payload: error.response.data.message,
    });
  }
};
//register
export const register = (userData) => async (dispatch) => {
  try {
    console.log(userData);
    dispatch({ type: "register_request" });
    const config = { headers: { "Content-Type": "multipart/json" } };
    const { data } = await axios.post(`api/v1/register`, userData, config);
    dispatch({ type: "login_success", payload: data.user });
  } catch (error) {
    dispatch({
      type: "register_fail",
      payload: error.response.data.message,
    });
  }
};

//loaduser
export const loaduser = () => async (dispatch) => {
  try {
    dispatch({ type: "load_user_request" });
    const { data } = await axios.get(`/api/v1/me`);
    dispatch({ type: "load_user_success", payload: data.user });
  } catch (error) {
    dispatch({
      type: "load_user_fail",
      payload: error.response.data.message,
    });
  }
};

//logout

export const logout = () => async (dispatch) => {
  try {
    await axios.get(`/api/v1/logout`);
    dispatch({ type: "logout_success" });
    console.log("HI");
  } catch (error) {
    dispatch({
      type: "logout_fail",
      payload: error.response.data.message,
    });
  }
};

//update profile
export const updateProfile = (userData) => async (dispatch) => {
  try {
    // console.log(userData);
    dispatch({ type: "update_profile_request" });
    const config = { headers: { "Content-Type": "multipart/json" } };
    const { data } = await axios.put("/api/v1/me/update", userData, config);
    dispatch({ type: "update_profile_success", payload: data.success });
  } catch (error) {
    dispatch({
      type: "update_profile_fail",
      payload: error.response.data.message,
    });
  }
};

//update password
export const updatePassword = (password) => async (dispatch) => {
  try {
    // console.log(userData);
    dispatch({ type: "update_password_request" });
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.put(
      "/api/v1/password/update",
      password,
      config
    );
    dispatch({ type: "update_password_success", payload: data.success });
  } catch (error) {
    dispatch({
      type: "update_password_fail",
      payload: error.response.data.message,
    });
  }
};

//forgot password
export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: "forgot_password_request" });
    // console.log(email, password);
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(`/api/v1/password/forgot`, email, config);
    dispatch({ type: "forgot_password_success", payload: data.message });
  } catch (error) {
    dispatch({
      type: "forgot_password_fail",
      payload: error.response.data.message,
    });
  }
};

//reset password
export const resetPassword = (token, passwords) => async (dispatch) => {
  try {
    dispatch({ type: "reset_password_request" });
    // console.log(email, password);
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.put(
      `/api/v1/password/reset/${token}`,
      passwords,
      config
    );
    dispatch({ type: "reset_password_success", payload: data.success });
  } catch (error) {
    dispatch({
      type: "reset_password_fail",
      payload: error.response.data.message,
    });
  }
};

export const clearError = () => async (dispatch) => {
  dispatch({ type: "clear_error" });
};
