import { io } from "socket.io-client";

const token = localStorage.getItem("token");
const URL =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_API_PRO_URL!
    : process.env.REACT_APP_API_DEV_URL!;
export const socket = io(URL, {
  extraHeaders: {
    Authorization: token || "",
  },
});
