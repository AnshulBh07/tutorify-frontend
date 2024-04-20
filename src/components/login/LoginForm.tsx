import React, { useEffect } from "react";
import styles from "../../sass/loginFormStyles.module.scss";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { RiFacebookFill } from "react-icons/ri";
import { GiCheckMark } from "react-icons/gi";
import { AppDispatch, RootState } from "../../store";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  validateEmail,
  validatePassword,
} from "../../services/helper-functions/formValidation";
import { loginUser } from "../../services/helper-functions/loginPageRequests";
import { setToast } from "../../services/helper-functions/setToast";
import { Toast } from "../misc/Toast";

export const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const loginState = useSelector((state: RootState) => state.login);

  const { email, password, remember } = loginState;

  // set toast status to initial on component render
  useEffect(() => {
    dispatch({ type: "toast/status", payload: "initial" });
  }, [dispatch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    switch (name) {
      case "email":
        dispatch({ type: "login/email", payload: value });
        break;
      case "pwd":
        dispatch({ type: "login/password", payload: value });
        break;
      case "remember":
        dispatch({ type: "login/remember" });
        break;
      default:
        break;
    }
  };

  let timer: NodeJS.Timeout;

  const handleCloseClick = () => {
    clearTimeout(timer);
    dispatch({ type: "toast/status", payload: "close" });
  };

  const handleForgotClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setToast("error", "Please enter a valid email", dispatch, timer);
      return;
    }

    navigate("/forgot");
  };

  const handleFormSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    clearTimeout(timer);

    // validate inputs
    if (email === "" || password === "") {
      setToast("error", "Please fill in all fields", dispatch, timer);
      return;
    }

    if (!validateEmail(email)) {
      setToast("error", "Please enter a valid email", dispatch, timer);
      return;
    }

    if (!validatePassword(password)[0]) {
      setToast(
        "error",
        validatePassword(password)[1] as string,
        dispatch,
        timer
      );
      return;
    }

    // now send authentication request to user
    const response = await loginUser(loginState);

    if (response) {
      if (
        response.status === 400 ||
        response.status === 500 ||
        response.status === 401 ||
        response.status === 403 ||
        response.status === 404
      ) {
        setToast("warning", response.data, dispatch, timer);
        return;
      }

      // if a successful request
      if (response.status === 200) {
        // store tokens in local storage and store user info in a state
        const tokens = {
          access_token: response.data.access_token,
          refresh_token: response.data.refresh_token,
          persistent_token: remember ? response.data.persistent_token : null,
        };
        localStorage.setItem("tokens", JSON.stringify(tokens));

        dispatch({ type: "login/isAuthenticated", payload: true });
        setToast(
          "success",
          "Login Successful, redirecting...",
          dispatch,
          timer
        );

        setTimeout(() => {
          navigate("/home");
        }, 4100);
      }
    }
  };

  return (
    <React.Fragment>
      <div className={styles.container}>
        <h2 className={styles.title}>login</h2>

        <form action="post" className={styles.form_wrapper}>
          <label htmlFor="email" className={styles.input_label}>
            <p className={styles.label_title}>email address</p>
            <input
              type="text"
              name="email"
              id="email"
              className={styles.input_field}
              value={email}
              onChange={handleInputChange}
            />
          </label>

          <label htmlFor="pwd" className={styles.input_label}>
            <p className={styles.label_title}>
              password
              <button className={styles.forgot_btn} onClick={handleForgotClick}>
                forgot password?
              </button>
            </p>
            <input
              type="password"
              name="pwd"
              id="pwd"
              className={styles.input_field}
              value={password}
              onChange={handleInputChange}
            />
          </label>

          <label htmlFor="remember" className={styles.remember_label}>
            <span
              className={styles.checkbox}
              style={
                remember
                  ? { backgroundColor: "#ff922f", borderColor: "#ff922f" }
                  : {}
              }
            >
              {remember && <GiCheckMark className={styles.checkmark} />}
            </span>
            <input
              type="checkbox"
              name="remember"
              id="remember"
              className={styles.input_checkbox}
              onChange={handleInputChange}
            />
            remember me
          </label>

          <button
            type="submit"
            className={styles.submit_btn}
            onClick={handleFormSubmit}
          >
            login
          </button>
        </form>

        <div className={styles.separator}></div>

        <div className={styles.btn_group}>
          <button className={styles.google}>
            <FcGoogle className={styles.icon} />
            google
          </button>
          <button className={styles.facebook}>
            <RiFacebookFill className={styles.icon} />
            facebook
          </button>
        </div>
      </div>

      <Toast handleClickFn={handleCloseClick} />
    </React.Fragment>
  );
};
