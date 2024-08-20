import axios from "axios";

export const myAxios = axios.create({baseURL: process.env.REACT_APP_API_DEV_URL})