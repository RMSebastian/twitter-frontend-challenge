import { useMutation } from "@tanstack/react-query";
import {
  followUser_param_endpoint,
  unfollowUser_param_endpoint,
} from "../../endpoints";
import { postData } from "../../service/HttpRequestService";
import { useToast } from "../../components/toast/ToastProvider";
import { ToastType } from "../../components/toast/Toast";
import { queryClient } from "../../components/layout/Layout";
import { AuthorDTO, UserDTO } from "../../service";

//Use Mutators
export const useFollowUser = () => {
  const { addToast } = useToast();
  return useMutation<Object, Error, string>({
    mutationKey: ["useFollowUser"],
    mutationFn: (userId: string): Promise<Object> =>
      postData<string, Object>(followUser_param_endpoint(userId)),
    onSuccess: (data, userId) => {
      addToast({
        message: "Follow created Successfully",
        type: ToastType.SUCCESS,
      });
      queryClient.setQueryData<UserDTO>(["GetMyUser"], (oldUserData) => {
        if (oldUserData) {
          const updatedFollowing = [
            ...oldUserData.following,
            { id: userId, ...data } as AuthorDTO,
          ];
          return {
            ...oldUserData,
            following: updatedFollowing,
          };
        }
        return oldUserData;
      });
    },
    onError: (error) => {
      addToast({ message: "Error creating follow", type: ToastType.ALERT });
      console.error("Follow Error:", error);
    },
  });
};

export const useUnfollowUser = () => {
  const { addToast } = useToast();
  return useMutation<Object, Error, string>({
    mutationKey: ["useUnfollowUser"],
    mutationFn: async (userId: string): Promise<Object> =>
      postData<string, Object>(unfollowUser_param_endpoint(userId)),
    onSuccess: (data, userId) => {
      addToast({
        message: "Unfollow created Successfully",
        type: ToastType.SUCCESS,
      });
      queryClient.setQueryData<UserDTO>(["GetMyUser"], (oldUserData) => {
        if (oldUserData) {
          const updatedFollowing = oldUserData.following.filter(
            (author) => author.id !== userId
          );
          console.log(updatedFollowing);
          return {
            ...oldUserData,
            following: updatedFollowing,
          };
        }
        return oldUserData;
      });
    },
    onError: (error) => {
      addToast({ message: "Error creating unfollow", type: ToastType.ALERT });
      console.error("Unfollow Error:", error);
    },
  });
};
