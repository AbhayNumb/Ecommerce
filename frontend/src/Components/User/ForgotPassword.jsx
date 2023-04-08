import React from "react";
import { Fragment, useEffect, useState } from "react";
import Loader from "../Layout/Loader/Loader";
import { useSelector, useDispatch } from "react-redux";
import MetaDeta from "../Layout/MetaDeta";
import { useRef } from "react";
import { clearError } from "../../actions/userAction";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import { useAlert } from "react-alert";
import { forgotPassword } from "../../actions/userAction";
import "./ForgotPassword.css";
import { useNavigate } from "react-router-dom";
const ForgotPassword = () => {
  const alert = useAlert();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, message, loading } = useSelector(
    (state) => state.forgotPassword
  );
  const { user } = useSelector((state) => state.user);
  const forgotPasswordSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("email", email);
    dispatch(forgotPassword(myForm));
  };
  const [email, setEmail] = useState("");
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }

    if (message) {
      alert.success(message);
    }
  }, [dispatch, error, alert, message]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaDeta title="Forgot Password" />
          <div className="forgotPasswordContainer">
            <div className="forgotPasswordBox">
              <h2 className="forgotPasswordHeading">Forgot Password</h2>

              <form className="forgotPasswordForm">
                <div className="forgotPasswordEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <input
                  type="submit"
                  value="Send"
                  className="forgotPasswordBtn"
                  onClick={forgotPasswordSubmit}
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ForgotPassword;
