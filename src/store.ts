import { configureStore } from "@reduxjs/toolkit";
import { filterReducer } from "./reducers/filterReducer";
import { loginReducer } from "./reducers/loginReducer";
import { signupReducer } from "./reducers/signupReducer";
import { toastReducer } from "./reducers/toastReducer";

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    login: loginReducer,
    signup: signupReducer,
    toast: toastReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
