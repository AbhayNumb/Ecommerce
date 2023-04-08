import React from "react";
import { Fragment, useEffect, useState } from "react";
import Loader from "../Layout/Loader/Loader";
import { useSelector, useDispatch } from "react-redux";
import MetaDeta from "../Layout/MetaDeta";
import { useRef } from "react";
import { clearError } from "../../actions/userAction";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import { useAlert } from "react-alert";
import { forgotPassword } from "../../actions/userAction";
import { resetPassword } from "../../actions/userAction";
import { logout } from "../../actions/userAction";
import { useParams, useNavigate } from "react-router-dom";
import "./ResetPassword.css";
const ResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const alert = useAlert();

  const dispatch = useDispatch();
  const { error, success, loading } = useSelector(
    (state) => state.forgotPassword
  );
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const resetPasswordSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("password", password);
    myForm.set("confirmPassword", confirmPassword);
    dispatch(resetPassword(token, myForm));
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    if (success) {
      alert.success("Password Updated Successfully");
      navigate("/account");
    }
  }, [dispatch, error, alert, navigate, success]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaDeta title="Change Password" />
          <div className="resetPasswordContainer">
            <div className="resetPasswordBox">
              <h2 className="resetPasswordHeading">Update Profile</h2>

              <form
                className="resetPasswordForm"
                onSubmit={resetPasswordSubmit}
              >
                <div>
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  <LockIcon />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <input
                  type="submit"
                  value="Update"
                  className="resetPasswordBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ResetPassword;
