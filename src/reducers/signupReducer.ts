import { ISignupFormState } from "../services/interfaces";

const initialState: ISignupFormState = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  confirm_password: "",
};

type actionType = { type: string; payload?: string };

export const signupReducer = (state = initialState, action: actionType) => {
  switch (action.type) {
    case "signup/first_name":
      return { ...state, first_name: action.payload as string };
    case "signup/last_name":
      return { ...state, last_name: action.payload as string };
    case "signup/email":
      return { ...state, email: action.payload as string };
    case "signup/password":
      return { ...state, password: action.payload as string };
    case "signup/confirm_password":
      return { ...state, confirm_password: action.payload as string };
    default:
      return state;
  }
};
