import axios, { InternalAxiosRequestConfig } from "axios";

export const AxiosInterceptor = () => {
  const UpdateToken = (request: InternalAxiosRequestConfig<any>) => {
    const token = localStorage.getItem("token");
    if (token) {
      request.headers.Authorization = token;
    }
    return request;
  };

  axios.interceptors.request.use((request) => {
    return UpdateToken(request);
  });

  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status >= 400) {
        localStorage.removeItem("token");
        console.error(error);
      }
      return Promise.reject(error);
    }
  );
};
