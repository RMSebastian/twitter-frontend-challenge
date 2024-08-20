import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AxiosInterceptor } from "./axios/axios.interceptors";

AxiosInterceptor();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
