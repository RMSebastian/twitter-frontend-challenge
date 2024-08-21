import { QueryKey } from "@tanstack/react-query";
import { PostDTO, ReactionDTO } from ".";
import { queryClient } from "../components/layout/Layout";

export const updateInfiniteQueryPost = (
    queryKey: QueryKey,
    isIncremental: boolean,
    postId?: string,
    post?: PostDTO
  ) => {
    queryClient.setQueryData<{ pages: PostDTO[][]; pageParams: unknown[] }>(
      queryKey,
      (oldData) => {
        if (oldData) {
          if (isIncremental && post) {
            return {
              ...oldData,
              pages: [[post], ...oldData.pages],
            };
          } else if (postId) {
            return {
              ...oldData,
              pages: oldData.pages.map((page) =>
                page.filter((post) => post.id !== postId)
              ),
            };
          }
        }
        return oldData;
      }
    );
  };
  export const updateQueryPost = (
    queryKey: QueryKey,
    isIncremental: boolean
  ) => {
    queryClient.setQueryData<PostDTO>(queryKey, (oldData) => {
      const value = isIncremental ? 1 : -1;
      if (!oldData) return oldData;
      return {
        ...oldData,
        comments: oldData.comments + value,
      };
    });
  };

  export const updateInfiniteQueryReaction = (
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
  export const updateQueryReaction = (
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