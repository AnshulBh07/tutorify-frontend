import { AppDispatch } from "../../store";

type setToastType = (
  type: string,
  message: string,
  dispatchFn: AppDispatch,
  timer: NodeJS.Timeout
) => void;

export const setToast: setToastType = (type, message, dispatch, timer) => {
  clearTimeout(timer); //to clear any stale timers
  dispatch({ type: "toast/type", payload: type });
  dispatch({ type: "toast/message", payload: message });
  dispatch({ type: "toast/status", payload: "open" });

  timer = setTimeout(() => {
    dispatch({ type: "toast/status", payload: "close" });
  }, 4000);
};
