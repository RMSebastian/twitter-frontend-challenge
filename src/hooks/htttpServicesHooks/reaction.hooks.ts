import { useMutation } from "@tanstack/react-query";
import {
  createReaction_param_endpoint,
  deleteReaction_param_endpoint,
} from "../../endpoints";
import { PostDTO, ReactionData, ReactionDTO } from "../../service";
import { deleteData, postData } from "../../service/HttpRequestService";
import { useToast } from "../../components/toast/ToastProvider";
import { ToastType } from "../../components/toast/Toast";
import { updateInfiniteQueryReaction, updateQueryReaction } from "../../service/ReactQueryUpdateCache";

type usePostReactionProps = {
  postId: string;
  data: ReactionData;
};
export const usePostReaction = (isPost: boolean, parentId: string | null) => {
  const { addToast } = useToast();
  return useMutation<ReactionDTO, Error, usePostReactionProps>({
    mutationKey: ["usePostReaction"],
    mutationFn: async ({
      postId,
      data,
    }: usePostReactionProps): Promise<ReactionDTO> =>
      {return await postData<ReactionData, ReactionDTO>(
        createReaction_param_endpoint(postId),
        data
      )},
    onSuccess: (data, variables) => {
      if (isPost) {
        updateInfiniteQueryReaction(
          ["getAllPosts"],
          true,
          variables.postId,
          data
        );
        updateInfiniteQueryReaction(
          ["getPostByUser", data.userId],
          true,
          variables.postId,
          data
        );
        updateInfiniteQueryReaction(
          ["getCommentsByPostId", parentId],
          true,
          variables.postId,
          data
        );
        updateQueryReaction(["getPostById", variables.postId], true, data);
      } else {
        updateInfiniteQueryReaction(
          ["getCommentsById", variables.postId],
          true,
          variables.postId,
          data
        );
      }
      addToast({
        message: "Reaction posted successfully",
        type: ToastType.SUCCESS,
      });
    },
    onError: (error) => {
      addToast({ message: "Error posting reaction", type: ToastType.ALERT });
      console.error("ReactionPost Error", error);
    },
  });
};
export const useDeleteReaction = (
  isPost: boolean,
  parentId: string | null,
  post: PostDTO
) => {
  const { addToast } = useToast();
  return useMutation<ReactionDTO, Error, string>({
    mutationKey: ["useDeleteReaction"],
    mutationFn: async (reactionId: string): Promise<ReactionDTO> =>{
      return await deleteData(deleteReaction_param_endpoint(reactionId))
    }
      ,
    onSuccess: (data, reactionId) => {
      if (isPost) {
        updateInfiniteQueryReaction(
          ["getAllPosts"],
          false,
          reactionId,
          undefined
        );
        updateInfiniteQueryReaction(
          ["getPostByUser", data.userId],
          true,
          reactionId,
          undefined
        );
        updateInfiniteQueryReaction(
          ["getCommentsByPostId", parentId],
          true,
          reactionId,
          undefined
        );
        updateQueryReaction(["getPostById", post.id], true, data);
      } else {
        updateInfiniteQueryReaction(
          ["getCommentsById", post.id],
          true,
          reactionId,
          undefined
        );
      }
      addToast({
        message: "Reaction deleted successfully",
        type: ToastType.SUCCESS,
      });
    },
    onError: (error) => {
      addToast({ message: "Error deleting reaction", type: ToastType.ALERT });
      console.error("ReactionDelete Error", error);
    },
  });
};


