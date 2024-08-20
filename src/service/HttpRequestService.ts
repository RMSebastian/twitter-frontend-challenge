import axios from "axios";

const url =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_API_PRO_URL!
    : process.env.REACT_APP_API_DEV_URL!;

//T should be InputDatas
export const postData = async <T, T2>(
  endpoint: string,
  data?: T
): Promise<T2> => {
  console.log(url);
  const res = await axios.post(`${url}${endpoint}`, data);
  if (res.status === 200 || res.status === 201) return res.data;
  throw new Error(`Error Posting data: ${res.status}`);
};

//T should be Pagination interfaces
export const fetchData = async <T>(endpoint: string, params?: T) => {
  const res = await axios.get(`${url}${endpoint}`, { params });
  if (res.status === 200) return res.data;
  throw new Error(`Error Fetching data: ${res.status}`);
};
export const deleteData = async (endpoint: string) => {
  const res = await axios.delete(`${url}${endpoint}`);
  if (res.status === 200) return res.data;
  throw new Error(`Error deleting data: ${res.status}`);
};
