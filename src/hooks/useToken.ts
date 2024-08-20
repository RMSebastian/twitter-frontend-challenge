export const useToken = () => {
  const token = localStorage.getItem("token");
  return { token };
};
