import { InternalAxiosRequestConfig } from "axios";
import { myAxios } from "./axios.myAxios";

export const AxiosInterceptor = () => {
  const UpdateToken = (request: InternalAxiosRequestConfig<any>) => {
    const token = localStorage.getItem("token");
    if (token) {
      request.headers.Authorization = token;
    }
    return request;
  };

  myAxios.interceptors.request.use((request) => {
    return UpdateToken(request);
  });

  myAxios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status == 401) {
        localStorage.removeItem("token");
        console.error(error);
      }
      return Promise.reject(error);
    }
  );
};
