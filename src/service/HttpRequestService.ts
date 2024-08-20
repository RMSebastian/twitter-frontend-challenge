import { myAxios } from "../axios/axios.myAxios";



//T should be InputDatas
export const postData = async <T, T2>(
  endpoint: string,
  data?: T
): Promise<T2> => {
  const res = await myAxios.post(endpoint, data);
  if (res.status === 200 || res.status === 201) return res.data;
  throw new Error(`Error Posting data: ${res.status}`);
};

//T should be Pagination interfaces
export const fetchData = async <T>(endpoint: string, params?: T) => {
  const res = await myAxios.get(endpoint, { params });
  if (res.status === 200) return res.data;
  throw new Error(`Error Fetching data: ${res.status}`);
};
export const deleteData = async (endpoint: string) => {
  const res = await myAxios.delete(endpoint);
  if (res.status === 200) return res.data;
  throw new Error(`Error deleting data: ${res.status}`);
};
