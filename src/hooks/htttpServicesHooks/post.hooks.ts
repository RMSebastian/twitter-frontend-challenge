import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import {
  deletePostById_param_endpoint,
  getFollowPosts_endpoint,
  getPostById_param_endpoint,
  getPosts_endpoint,
  getPostsFromUser_param_endpoint,
  postPost_endpoint,
} from "../../endpoints";
import { PostData, PostDTO } from "../../service";
import {
  deleteData,
  fetchData,
  postData,
} from "../../service/HttpRequestService";
import { S3Service } from "../../service/S3Service";
import { queryClient } from "../../components/layout/Layout";
import { useToast } from "../../components/toast/ToastProvider";
import { ToastType } from "../../components/toast/Toast";
import { CursorPagination } from "../../util/Pagination";
import { LIMIT } from "../../util/Constants";

//Use Query
export const useGetPosts = () => {
  return useInfiniteQuery<PostDTO[]>({
    queryKey: [`getAllPosts`],
    queryFn: async ({
      pageParam = { limit: LIMIT, after: undefined, before: undefined },
    }) => {
      const response = await fetchData<CursorPagination>(
        getPosts_endpoint,
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
export const useGetFollowPosts = () => {
  return useInfiniteQuery<PostDTO[]>({
    queryKey: [`getFollowPosts`],
    queryFn: async ({
      pageParam = { limit: LIMIT, after: undefined, before: undefined },
    }) => {
      const response = await fetchData<CursorPagination>(
        getFollowPosts_endpoint,
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
export const useGetPostById = (postId: string) => {
  return useQuery<PostDTO>({
    queryKey: [`getPostById`, postId],
    queryFn: () => fetchData(getPostById_param_endpoint(postId)),
    staleTime: 50000,
    enabled: postId !== null,
  });
};
export const useGetPostsFromUser = (userId: string) => {
  return useInfiniteQuery<PostDTO[]>({
    queryKey: [`getPostByUser`, userId],
    queryFn: async ({
      pageParam = { limit: LIMIT, after: undefined, before: undefined },
    }) => {
      const response = await fetchData<CursorPagination>(
        getPostsFromUser_param_endpoint(userId),
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
type usePostPostProps = {
  content: string;
  parentId?: string;
  images?: string[];
};
//Use Mutators
export const usePostPost = () => {
  const { addToast } = useToast();
  return useMutation<PostDTO, Error, PostData>({
    mutationKey: ["usePostPost"],
    mutationFn: (data: PostData): Promise<PostDTO> => {
      const dto: usePostPostProps = {
        content: data.content,
        images: data.images?.map((image) => image.name),
        parentId: data.parentId,
      };

      return postData<usePostPostProps, PostDTO>(postPost_endpoint, dto);
    },
    onSuccess: async (data, variables) => {
      const { upload } = S3Service;
      if (data.images && data.images.length > 0) {
        for (const imageUrl of data.images) {
          const index: number = data.images.indexOf(imageUrl);
          await upload(variables.images![index], imageUrl);
        }
      }

      queryClient.setQueryData<{ pages: PostDTO[][]; pageParams: unknown[] }>(
        ["getAllPosts"],
        (postPages) => {
          if (postPages) {
            return {
              ...postPages,
              pages: [[data], ...postPages.pages],
            };
          }
          return postPages;
        }
      );
      addToast({
        message: "Post created successfully ",
        type: ToastType.SUCCESS,
      });
    },
    onError: (error) => {
      addToast({ message: "Error creating post", type: ToastType.ALERT });
      console.error("PostPost Error: ", error);
    },
  });
};
export const useDeletePostById = () => {
  const { addToast } = useToast();
  return useMutation<void, Error, string>({
    mutationKey: ["useDeletePostById"],
    mutationFn: (postId: string): Promise<void> =>
      deleteData(deletePostById_param_endpoint(postId)),
    onSuccess: (data, postId) => {
      queryClient.setQueryData<{ pages: PostDTO[][]; pageParams: unknown[] }>(
        ["getAllPosts"],
        (postPages) => {
          console.log(postPages);
          if (postPages) {
            return {
              ...postPages,
              pages: postPages.pages.map((page) =>
                page.filter((post) => post.id !== postId)
              ),
            };
          }
          return postPages;
        }
      );
      addToast({
        message: "Post deleted successfully",
        type: ToastType.SUCCESS,
      });
    },
    onError: (error) => {
      addToast({ message: "Error deleting post", type: ToastType.ALERT });
      console.error("Delete Error: ", error);
    },
  });
};
