import { ILoginFormState } from "../services/interfaces";

const initialState: ILoginFormState = {
  email: "",
  password: "",
  remember: false,
  isAuthenticated: false,
};

type actionType = { type: string; payload?: string | boolean };

export const loginReducer = (state = initialState, action: actionType) => {
  switch (action.type) {
    case "login/email":
      return { ...state, email: action.payload as string };
    case "login/password":
      return { ...state, password: action.payload as string };
    case "login/remember":
      return { ...state, remember: !state.remember };
    case "login/isAuthenticated":
      return { ...state, isAuthenticated: action.payload as boolean };
    default:
      return state;
  }
};
