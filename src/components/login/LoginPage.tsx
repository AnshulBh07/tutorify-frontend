import React, { useState } from "react";
import styles from "../../sass/loginPageStyles.module.scss";
import LoginClipart from "../../assets/images/clipart1.jpg";
import SignupClipart from "../../assets/images/clipart2.jpg";
import { SignupForm } from "./SignupForm";
import { LoginForm } from "./LoginForm";
// import { useLocation } from "react-router-dom";
// import { LoginForm } from "./LoginForm";
// import { SignupForm } from "./SignupForm";

export const LoginPage: React.FC = () => {
  const [status, setStatus] = useState<"login" | "signup">("login");

  return (
    <section className={styles.container__main}>
      <div className={styles.images_wrapper}>
        <img src={LoginClipart} alt="login img" className={styles.login_img} />
        <img
          src={SignupClipart}
          alt="signup img"
          className={styles.signup_img}
        />

        <div className={styles.form_wrapper}>
          <div className={styles.btn_group}>
            <button
              className={`${styles.choose_btn} ${
                status === "login" && styles.active
              }`}
              onClick={() => setStatus("login")}
            >
              login
            </button>
            <button
              className={`${styles.choose_btn} ${
                status === "signup" && styles.active
              }`}
              onClick={() => setStatus("signup")}
            >
              signup
            </button>
          </div>

          {status === "signup" ? <SignupForm /> : <LoginForm />}
        </div>
      </div>
    </section>
  );
};
