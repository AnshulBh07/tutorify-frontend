import React from "react";
import styles from "../../sass/signupFormStyles.module.scss";
import { AppDispatch, RootState } from "../../store";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  validateEmail,
  validateName,
  validatePassword,
} from "../../services/helper-functions/formValidation";
import { addNewUser } from "../../services/helper-functions/loginPageRequests";

export const SignupForm: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const signupState = useSelector((state: RootState) => state.signup);
  const { first_name, last_name, email, password, confirm_password } =
    signupState;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    switch (name) {
      case "first_name":
        dispatch({ type: "signup/first_name", payload: value });
        break;
      case "last_name":
        dispatch({ type: "signup/last_name", payload: value });
        break;
      case "email":
        dispatch({ type: "signup/email", payload: value });
        break;
      case "pwd":
        dispatch({ type: "signup/password", payload: value });
        break;
      case "cpwd":
        dispatch({ type: "signup/confirm_password", payload: value });
        break;
      default:
        break;
    }
  };

  const handleFormSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // first we will validate inputs
    if (password !== confirm_password) {
      alert("passwords do not match");
      return;
    }

    if (!validateName(first_name)) {
      alert("invalid first name");
      return;
    }

    if (!validateName(last_name)) {
      alert("invalid last name");
      return;
    }

    if (!validateEmail(email)) {
      alert("invalid email");
      return;
    }

    if (!validatePassword(password)[0]) {
      alert(validatePassword(password)[1]);
      return;
    }

    // now make a request to server to add the user to db
    const response = await addNewUser(signupState);

    if (response) {
      if (response.status === 200) {
        alert("User added successfully.");
        return;
      }

      if (
        response.status === 400 ||
        response.status === 500 ||
        response.status === 401
      ) {
        alert(response.data);
        return;
      }
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>signup</h1>

      <form action="post" className={styles.form_wrapper}>
        <div className={styles.name_wrapper}>
          <label htmlFor="first_name" className={styles.input_label}>
            <p className={styles.label_title}>first name</p>
            <input
              type="text"
              name="first_name"
              id="first_name"
              className={styles.input_field}
              value={first_name}
              onChange={handleInputChange}
            />
          </label>

          <label htmlFor="last_name" className={styles.input_label}>
            <p className={styles.label_title}>last name</p>
            <input
              type="text"
              name="last_name"
              id="last_name"
              className={styles.input_field}
              value={last_name}
              onChange={handleInputChange}
            />
          </label>
        </div>

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
          <p className={styles.label_title}>password</p>
          <input
            type="password"
            name="pwd"
            id="pwd"
            className={styles.input_field}
            value={password}
            onChange={handleInputChange}
          />
        </label>

        <label htmlFor="cpwd" className={styles.input_label}>
          <p className={styles.label_title}>confirm password</p>
          <input
            type="password"
            name="cpwd"
            id="cpwd"
            className={styles.input_field}
            value={confirm_password}
            onChange={handleInputChange}
          />
        </label>

        <button className={styles.submit_btn} onClick={handleFormSubmit}>
          signup
        </button>
      </form>
    </div>
  );
};
