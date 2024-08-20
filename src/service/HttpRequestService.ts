import axios from "axios";

//T should be InputDatas
export const postData = async <T, T2>(
  endpoint: string,
  data?: T
): Promise<T2> => {
  const res = await axios.post(`${process.env.REACT_APP_API_DEV_URL!}${endpoint}`, data);
  if (res.status === 200 || res.status === 201) return res.data;
  throw new Error(`Error Posting data: ${res.status}`);
};

//T should be Pagination interfaces
export const fetchData = async <T>(endpoint: string, params?: T) => {
  const res = await axios.get(`${process.env.REACT_APP_API_DEV_URL!}${endpoint}`, { params });
  if (res.status === 200) return res.data;
  throw new Error(`Error Fetching data: ${res.status}`);
};
export const deleteData = async (endpoint: string) => {
  const res = await axios.delete(`${process.env.REACT_APP_API_DEV_URL!}${endpoint}`);
  if (res.status === 200) return res.data;
  throw new Error(`Error deleting data: ${res.status}`);
};
