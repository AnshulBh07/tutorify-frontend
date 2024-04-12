import axios, { AxiosError, isAxiosError } from "axios";

export const fetchAllLessons = async (
  signal: AbortSignal,
  searchString: string
) => {
  try {
    const response = await axios({
      method: "get",
      url: `/api/lesson${searchString}`,
      signal: signal,
    });

    if (response) return response;
  } catch (err) {
    // all 4xx and 5xx errors are caught in catch block for axios
    if (isAxiosError(err)) {
      const axiosErr = err as AxiosError;

      if (axiosErr.response) {
        return axiosErr.response;
      } else {
        throw new Error("Something happened!, Please try again later");
      }
    }
  }
};
