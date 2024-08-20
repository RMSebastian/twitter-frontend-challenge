import React, { useEffect } from "react";
import Feed from "./Feed";
import { useGetCommentsByPostId } from "../../hooks/htttpServicesHooks/comment.hooks";
import { useInView } from "react-intersection-observer";
import Loader from "../loader/Loader";

interface CommentFeedProps {
  postId: string;
}
const CommentFeed = ({ postId }: CommentFeedProps) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useGetCommentsByPostId(postId);
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);
  return (
    <div style={{ overflowY: "scroll" }}>
      {data?.pages.map((d, index) => {
        return <Feed key={index} posts={d} loading={isLoading} />;
      })}
      <div ref={ref}>{isFetchingNextPage ? <Loader /> : <></>}</div>
    </div>
  );
};
export default CommentFeed;
