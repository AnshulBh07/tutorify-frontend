import axios, { isAxiosError, AxiosError } from "axios";
import { ILoginFormState, ISignupFormState } from "../interfaces";

export const addNewUser = async (signupData: ISignupFormState) => {
  try {
    const response = await axios({
      method: "post",
      url: "/api/signup",
      data: signupData,
    });

    if (response) return response;
  } catch (err) {
    if (isAxiosError(err)) {
      const axiosErr = err as AxiosError;

      if (axiosErr.response) {
        return axiosErr.response;
      } else {
        throw new Error("Something went wrong.");
      }
    }
  }
};

export const loginUser = async (loginState: ILoginFormState) => {
  try {
    const response = await axios({
      method: "post",
      url: "/api/login",
      data: loginState,
    });

    if (response) return response;
  } catch (err) {
    if (isAxiosError(err)) {
      const axiosErr = err as AxiosError;

      if (axiosErr.response) {
        return axiosErr.response;
      } else {
        throw new Error("Something went wrong. Please try again later.");
      }
    }
  }
};

export const generateOtp = async (email: string, signal: AbortSignal) => {
  try {
    const response = await axios({
      method: "post",
      url: "/api/login/generate_otp",
      data: { email: email },
      signal: signal,
    });

    if (response) return response;
  } catch (err) {
    if (isAxiosError(err)) {
      const axiosErr = err as AxiosError;

      if (axiosErr.response) {
        return axiosErr.response;
      } else {
        throw new Error("Something went wrong. Please try again later.");
      }
    }
  }
};

export const validateOtp = async (
  email: string,
  otp: string,
  signal: AbortSignal
) => {
  try {
    const response = await axios({
      method: "post",
      url: "/api/login/validate_otp",
      data: { email: email, otp: otp },
      signal: signal,
    });

    if (response) return response;
  } catch (err) {
    if (isAxiosError(err)) {
      const axiosErr = err as AxiosError;

      if (axiosErr.response) {
        return axiosErr.response;
      } else {
        throw new Error("Something went wrong. Please try again later.");
      }
    }
  }
};

export const changePassword = async (
  password: string,
  email: string,
  signal: AbortSignal
) => {
  try {
    const response = await axios({
      method: "post",
      url: "/api/login/change_password",
      data: { password: password, email: email },
      signal: signal,
    });

    if (response) return response;
  } catch (err) {
    if (isAxiosError(err)) {
      const axiosErr = err as AxiosError;

      if (axiosErr.response) {
        return axiosErr.response;
      } else {
        throw new Error("Something went wrong. Please try again later.");
      }
    }
  }
};
