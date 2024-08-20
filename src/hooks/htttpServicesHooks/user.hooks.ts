import { useQuery } from "@tanstack/react-query";
import {
  delete_endpoint,
  getUser_param_endpoint,
  recommendedUsers_endpoint,
  searchedUsers_param_endpoint,
  userMe_endpoint,
} from "../../endpoints";
import { deleteData, fetchData } from "../../service/HttpRequestService";
import { OffsetPagination } from "../../util/Pagination";
import { AuthorDTO, UserDTO } from "../../service";

//Use Query
export const useGetMyUser = () => {
  return useQuery<UserDTO>({
    queryKey: [`GetMyUser`],
    queryFn: () => fetchData(userMe_endpoint),
    staleTime: Infinity,
  });
};
export const useGetRecommendedUsers = (
  limit: number,
  skip: number | undefined
) => {
  return useQuery<AuthorDTO[]>({
    queryKey: [`GetRecommendedUsers`],
    queryFn: () =>
      fetchData<OffsetPagination>(recommendedUsers_endpoint, {
        limit: limit,
        skip: skip,
      }),
    staleTime: 50000,
  });
};
export const useGetSearchUsers = (
  username: string,
  limit: number,
  skip: number
) => {
  return useQuery<AuthorDTO[]>({
    queryKey: [`GetSearchUsers`, username],
    queryFn: () =>
      fetchData<OffsetPagination>(searchedUsers_param_endpoint(username), {
        limit: limit,
        skip: skip,
      }),
    enabled: username.trim() !== "",
  });
};
export const useGetUserById = (id: string) => {
  return useQuery<UserDTO>({
    queryKey: [`GetUserById`, id],
    queryFn: () => fetchData(getUser_param_endpoint(id)),
    staleTime: Infinity,
  });
};

//Use Mutators
export const useDeleteUser = () => {
  const deleteUser = async () => {
    deleteData(delete_endpoint);
  };

  return {
    deleteUser,
  };
};
