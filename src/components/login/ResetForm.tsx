import React, { useEffect } from "react";
import styles from "../../sass/resetFormStyles.module.scss";
import Lock from "../../assets/images/lock-animation.gif";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import {
  validateEmail,
  validatePassword,
} from "../../services/helper-functions/formValidation";
import { useNavigate } from "react-router-dom";
import { setToast } from "../../services/helper-functions/setToast";
import { useDispatch } from "react-redux";
import { changePassword } from "../../services/helper-functions/loginPageRequests";

type valuesType = { password: string; confirmPassword: string };
export const ResetForm: React.FC = () => {
  const { email } = useSelector((state: RootState) => state.login);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const [values, setValues] = React.useState<valuesType>({
    password: "",
    confirmPassword: "",
  });

  let timer: NodeJS.Timeout;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    switch (name) {
      case "pwd":
        setValues({ ...values, password: value });
        break;
      case "cpwd":
        setValues({ ...values, confirmPassword: value });
        break;
      default:
        break;
    }
  };

  const handleFormSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (values.password !== values.confirmPassword) {
      setToast("error", "Passwords do not match", dispatch, timer);
      return;
    }

    // validate password
    if (!validatePassword(values.password)[0]) {
      setToast("error", validatePassword(values.password)[1], dispatch, timer);
      return;
    }

    const controller = new AbortController();
    // everything valid, send a request to server
    const response = await changePassword(
      values.password,
      email,
      controller.signal
    );

    if (response) {
      if (response.status >= 400 && response.status <= 500) {
        setToast("error", response.data, dispatch, timer);
        return;
      }

      if (response.status === 200) {
        setToast("success", "Password changed successfully", dispatch, timer);
        setTimeout(() => {
          navigate("/login");
        }, 4000);
      }
    }
  };

  useEffect(() => {
    if (!validateEmail(email)) {
      navigate("/login");
    }
  }, [email, navigate]);

  return (
    <form className={styles.container} method="post">
      <div className={styles.img_wrapper}>
        <img src={Lock} alt="lock" className={styles.lock_gif} />
      </div>

      <p className={styles.text}>
        Reset password for <span>{email}</span>
      </p>

      <label htmlFor="pwd" className={styles.input_label}>
        <p className={styles.label_title}>new password</p>
        <input
          type="password"
          name="pwd"
          id="pwd"
          className={styles.input_field}
          value={values.password}
          onChange={handleInputChange}
        />
      </label>

      <label htmlFor="cpwd" className={styles.input_label}>
        <p className={styles.label_title}>re-enter new password</p>
        <input
          type="password"
          name="cpwd"
          id="cpwd"
          className={styles.input_field}
          value={values.confirmPassword}
          onChange={handleInputChange}
        />
      </label>

      <button className={styles.submit_btn} onClick={handleFormSubmit}>
        reset
      </button>
    </form>
  );
};
