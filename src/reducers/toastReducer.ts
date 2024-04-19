import { IToast } from "../services/interfaces";

const initialState: IToast = {
  message: "",
  type: "success",
  status: "initial",
};

type actionType = {
  type: string;
  payload?: string;
};

export const toastReducer = (state = initialState, action: actionType) => {
  switch (action.type) {
    case "toast/message":
      return { ...state, message: action.payload as string };
    case "toast/type":
      return { ...state, type: action.payload as string };
    case "toast/status":
      return { ...state, status: action.payload as string };
    default:
      return state;
  }
};
