import axios, { AxiosError, isAxiosError } from "axios";

export const fetchAllTutors = async (
  signal: AbortSignal,
  queryParams: string
) => {
  try {
    const response = await axios({
      method: "get",
      url: `/api/tutor${queryParams}`,
      signal: signal,
    });

    if (response) return response;
  } catch (err) {
    // everything except 2xx and 3xx is caught in error in axios
    if (isAxiosError(err)) {
      const axiosErr = err as AxiosError;

      if (axiosErr.response) {
        return axiosErr.response;
      }
    }
    console.error(err);
  }
};
