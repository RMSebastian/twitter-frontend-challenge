import { QueryKey, useMutation } from "@tanstack/react-query";
import {
  createReaction_param_endpoint,
  deleteReaction_param_endpoint,
} from "../../endpoints";
import { PostDTO, ReactionData, ReactionDTO } from "../../service";
import { deleteData, postData } from "../../service/HttpRequestService";
import { queryClient } from "../../components/layout/Layout";
import { useToast } from "../../components/toast/ToastProvider";
import { ToastType } from "../../components/toast/Toast";

type usePostReactionProps = {
  postId: string;
  data: ReactionData;
};
export const usePostReaction = (isPost: boolean, parentId: string | null) => {
  const { addToast } = useToast();
  return useMutation<ReactionDTO, Error, usePostReactionProps>({
    mutationKey: ["usePostReaction"],
    mutationFn: ({
      postId,
      data,
    }: usePostReactionProps): Promise<ReactionDTO> =>
      postData<ReactionData, ReactionDTO>(
        createReaction_param_endpoint(postId),
        data
      ),
    onSuccess: (data, variables) => {
      if (isPost) {
        updateCommentInfiniteQuery(
          ["getAllPosts"],
          true,
          variables.postId,
          data
        );
        updateCommentInfiniteQuery(
          ["getPostByUser", data.userId],
          true,
          variables.postId,
          data
        );
        updateCommentInfiniteQuery(
          ["getCommentsByPostId", parentId],
          true,
          variables.postId,
          data
        );
        updateReactionQuery(["getPostById", variables.postId], true, data);
      } else {
        updateCommentInfiniteQuery(
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
    mutationFn: (reactionId: string): Promise<ReactionDTO> =>
      deleteData(deleteReaction_param_endpoint(reactionId)),
    onSuccess: (data, reactionId) => {
      if (isPost) {
        updateCommentInfiniteQuery(
          ["getAllPosts"],
          false,
          reactionId,
          undefined
        );
        updateCommentInfiniteQuery(
          ["getPostByUser", data.userId],
          true,
          reactionId,
          undefined
        );
        updateCommentInfiniteQuery(
          ["getCommentsByPostId", parentId],
          true,
          reactionId,
          undefined
        );
        updateReactionQuery(["getPostById", post.id], true, data);
      } else {
        updateCommentInfiniteQuery(
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

export const updateCommentInfiniteQuery = (
  queryKey: QueryKey,
  isIncremental: boolean,
  postId?: string,
  reaction?: ReactionDTO
) => {
  queryClient.setQueryData<{ pages: PostDTO[][]; pageParams: unknown[] }>(
    queryKey,
    (oldData) => {
      if (oldData) {
        if (isIncremental && reaction) {
          return {
            ...oldData,
            pages: oldData.pages.map((page) =>
              page.map((post) =>
                post.id === postId
                  ? {
                      ...post,
                      reactions: [...post.reactions, reaction],
                    }
                  : post
              )
            ),
          };
        } else if (postId) {
          //reactionId from this point
          return {
            ...oldData,
            pages: oldData.pages.map((page) =>
              page.map((post) => {
                return {
                  ...post,
                  reactions: post.reactions.filter((r) => r.id !== postId),
                };
              })
            ),
          };
        }
      }
      return oldData;
    }
  );
};
export const updateReactionQuery = (
  queryKey: QueryKey,
  isIncremental: boolean,
  reaction?: ReactionDTO
) => {
  queryClient.setQueryData<PostDTO>(queryKey, (oldData) => {
    if (!oldData || !reaction) return oldData;

    const updatedReactions = isIncremental
      ? [...oldData.reactions, reaction]
      : oldData.reactions.filter((r) => r.id !== reaction.id);

    return {
      ...oldData,
      reactions: updatedReactions,
    };
  });
};
