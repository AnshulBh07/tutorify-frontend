import React, { useEffect, useRef, useState } from "react";
import styles from "../../sass/forgotPassStyles.module.scss";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { validateEmail } from "../../services/helper-functions/formValidation";
import { useNavigate } from "react-router-dom";
import {
  generateOtp,
  validateOtp,
} from "../../services/helper-functions/loginPageRequests";
import { setToast } from "../../services/helper-functions/setToast";
import { useDispatch } from "react-redux";
import { Toast } from "../misc/Toast";
import { ResetForm } from "./ResetForm";

export const ForgotPassword: React.FC = () => {
  const { email } = useSelector((state: RootState) => state.login);
  const [otpData, setOtpData] = useState<string[]>(new Array(8).fill(""));
  const navigate = useNavigate();
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const dispatch: AppDispatch = useDispatch();
  const [showResetForm, setShowResetForm] = useState<boolean>(false);

  //   console.log(otpData);

  const formatEmail = () => {
    const arr = email.split("@");
    return "" + arr[0].slice(0, 3) + "***@" + arr[1];
  };

  const handleOtpInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = e.target;

    // check if a number
    if (isNaN(Number(value))) {
      return;
    }

    const newOtp = [...otpData];

    // allow only one input
    newOtp[index] = value.substring(value.length - 1);
    setOtpData(newOtp);

    // set next box to focus if the current is filled
    if (index < 7 && value.length === 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  //   function that handle backspace press
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && index > 0 && inputRefs.current[index - 1]) {
      if (index === 7 && otpData[index].length > 0) {
        const newOtp = [...otpData];
        newOtp[index] = "";
        setOtpData(newOtp);
        return;
      }

      inputRefs.current[index - 1].focus();
    }
  };

  const handleClickfn = () => {
    clearTimeout(timer);
    dispatch({ type: "toast/status", payload: "close" });
  };

  let timer: NodeJS.Timeout;

  const handleFormSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // validate input
    for (let i = 0; i < 8; i++) {
      if (otpData[i].length === 0) {
        setToast("error", "Invalid OTP.", dispatch, timer);
        return;
      }
    }

    // get all the otp and form a string
    const otp = otpData.join("");

    const controller = new AbortController();
    // send this otp to server for validation
    const response = await validateOtp(email, otp, controller.signal);

    if (response) {
      if (response.status === 200) {
        setToast("success", "OTP verified successfully", dispatch, timer);
        setTimeout(() => {
          setShowResetForm(true);
        }, 4000);
      }

      if (response.status >= 400 && response.status <= 500) {
        setToast("error", response.data, dispatch, timer);
        return;
      }
    }
  };

  //   if the email is empty, navigate back to login page
  useEffect(() => {
    if (!validateEmail(email)) {
      navigate("/login");
    }
  }, [email, navigate]);

  //   useEffect hook that focuses on first input box at initial render
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  //   making a request to server to generate a new otp for the given email
  useEffect(() => {
    const controller = new AbortController();
    let toastTimer: NodeJS.Timeout;

    if (validateEmail(email)) {
      // send request
      const generateOTPFn = async () => {
        const response = await generateOtp(email, controller.signal);

        if (response) {
          if (response.status === 200) {
            return;
          }

          if (response.status >= 400 && response.status <= 500) {
            setToast("error", response.data, dispatch, toastTimer);
            return;
          }
        }
      };

      generateOTPFn();
    }

    // cleanup function
    return () => {
      controller.abort();
      clearTimeout(toastTimer);
    };
  }, [email, dispatch]);

  return (
    <React.Fragment>
      <section className={styles.container__main}>
        {showResetForm ? (
          <ResetForm />
        ) : (
          <form className={styles.form_wrapper}>
            <h1 className={styles.title}>verify your email</h1>
            <p className={styles.text}>
              Enter the 8 digit code you have received on{" "}
              <span className={styles.email}>{formatEmail()}</span>
            </p>

            <div className={styles.otp_container}>
              <p className={styles.header}>code</p>

              <div className={styles.otp_wrapper}>
                {otpData.map((item, index) => {
                  return (
                    <input
                      type="text"
                      className={styles.input_box}
                      key={index}
                      id={`input-${index}`}
                      ref={(currRef) => {
                        if (currRef) inputRefs.current[index] = currRef;
                      }}
                      onChange={(e) => handleOtpInput(e, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      value={item}
                    />
                  );
                })}
              </div>
            </div>

            <button className={styles.submit_btn} onClick={handleFormSubmit}>
              verify
            </button>
          </form>
        )}
      </section>
      <Toast handleClickFn={handleClickfn} />
    </React.Fragment>
  );
};
