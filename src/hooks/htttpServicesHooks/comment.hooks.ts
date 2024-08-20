import {
  QueryKey,
  useInfiniteQuery,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import {
  deleteCommentById_param_endpoint,
  getCommentById_param_endpoint,
  getCommentsByPostId_param_endpoint,
  getCommentsFromUser_param_endpoint,
  commentMe_endpoint,
  postComment_param_endpoint,
} from "../../endpoints";
import { PostData, PostDTO } from "../../service";
import {
  deleteData,
  fetchData,
  postData,
} from "../../service/HttpRequestService";
import { S3Service } from "../../service/S3Service";
import { queryClient } from "../../components/layout/Layout";
import { ToastType } from "../../components/toast/Toast";
import { useToast } from "../../components/toast/ToastProvider";
import { LIMIT } from "../../util/Constants";
import { CursorPagination } from "../../util/Pagination";

export const useGetCommentById = (commentId: string) => {
  return useQuery<PostDTO>({
    queryKey: [`getCommentsById`, commentId],
    queryFn: () => fetchData(getCommentById_param_endpoint(commentId)),
    staleTime: 50000,
  });
};
export const useGetCommentsByPostId = (commentId: string) => {
  return useInfiniteQuery<PostDTO[]>({
    queryKey: [`getCommentsByPostId`, commentId],
    queryFn: async ({
      pageParam = { limit: LIMIT, after: undefined, before: undefined },
    }) => {
      const response = await fetchData<CursorPagination>(
        getCommentsByPostId_param_endpoint(commentId),
        pageParam!
      );
      return response;
    },
    initialPageParam: { limit: LIMIT, after: undefined, before: undefined },
    getNextPageParam: (lastPage) => {
      return lastPage.length === LIMIT
        ? {
            limit: LIMIT,
            after: lastPage[lastPage.length - 1].id,
            before: undefined,
          }
        : undefined;
    },
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    staleTime: 50000,
  });
};
type usePostCommentProps = {
  content: string;
  parentId?: string;
  images?: string[];
};

//Use Mutators
export const usePostComment = () => {
  const { addToast } = useToast();
  return useMutation<PostDTO, Error, PostData>({
    mutationKey: ["PostComment"],
    mutationFn: (data: PostData): Promise<PostDTO> => {
      const dto: usePostCommentProps = {
        content: data.content,
        images: data.images?.map((image) => image.name),
        parentId: data.parentId,
      };

      return postData<usePostCommentProps, PostDTO>(
        postComment_param_endpoint(data.parentId!),
        dto
      );
    },
    onSuccess: async (data, variables) => {
      const { upload } = S3Service;
      if (data.images && data.images.length > 0) {
        for (const imageUrl of data.images) {
          const index: number = data.images.indexOf(imageUrl);
          await upload(variables.images![index], imageUrl);
        }
      }
      updateCommentInfiniteQueryNumber(
        ["getAllPosts"],
        variables.parentId!,
        true
      );
      updateCommentInfiniteQueryNumber(
        ["getFollowPosts"],
        variables.parentId!,
        true
      );
      updateCommentInfiniteQueryPost(
        ["getCommentsByPostId", variables.parentId!],
        true,
        undefined,
        data
      );
      updateCommentQuery(["getCommentById", variables.parentId!], true);

      updateCommentQuery(["getPostById", variables.parentId!], true);

      addToast({
        message: "Comment created successfully ",
        type: ToastType.SUCCESS,
      });
    },
    onError: (error) => {
      addToast({ message: "Error creating comment", type: ToastType.ALERT });
      console.error("PostComment Error: ", error);
    },
  });
};

type DeletePostProps = {
  id: string;
  parentId: string;
};
export const useDeleteCommentById = () => {
  const { addToast } = useToast();
  return useMutation<void, Error, DeletePostProps>({
    mutationKey: ["DeletePostById"],
    mutationFn: (props: DeletePostProps): Promise<void> =>
      deleteData(deleteCommentById_param_endpoint(props.id)),
    onSuccess: (data, props) => {
      updateCommentInfiniteQueryNumber(["getAllPosts"], props.parentId!, false);
      updateCommentInfiniteQueryNumber(
        ["getFollowPosts"],
        props.parentId!,
        false
      );
      updateCommentInfiniteQueryPost(
        ["getCommentsByPostId", props.parentId!],
        false,
        props.id!,
        undefined
      );
      updateCommentQuery(["getCommentById", props.parentId!], false);

      updateCommentQuery(["getPostById", props.parentId!], false);

      addToast({
        message: "Comment created successfully ",
        type: ToastType.SUCCESS,
      });
      addToast({
        message: "Comment deleted successfully",
        type: ToastType.SUCCESS,
      });
    },
    onError: (error) => {
      addToast({ message: "Error deleting comment", type: ToastType.ALERT });
      console.error("DeleteComment Error: ", error);
    },
  });
};

export const updateCommentInfiniteQueryNumber = (
  queryKey: QueryKey,
  parentId: string,
  isIncremental: boolean
) => {
  queryClient.setQueryData<{ pages: PostDTO[][]; pageParams: unknown[] }>(
    queryKey,
    (oldData) => {
      const value = isIncremental ? 1 : -1;
      if (!oldData) return oldData;
      return {
        ...oldData,
        pages: oldData.pages.map((page) =>
          page.map((post) =>
            post.id === parentId
              ? { ...post, comments: post.comments + value }
              : post
          )
        ),
      };
    }
  );
};

//Update Queries
export const updateCommentInfiniteQueryPost = (
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
export const updateCommentQuery = (
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
