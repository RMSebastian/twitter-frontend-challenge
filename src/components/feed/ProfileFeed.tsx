import Feed from "./Feed";
import { useGetPostsFromUser } from "../../hooks/htttpServicesHooks/post.hooks";
import { Navigate, useParams } from "react-router-dom";
import Loader from "../loader/Loader";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const ProfileFeed = () => {
  const id = useParams().id;
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useGetPostsFromUser(id || "");
  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  if (id) {
    return (
      <>
        <div style={{ overflowY: "scroll" }}>
          {data?.pages.map((d, index) => {
            return <Feed key={index} posts={d ? d : []} loading={isLoading} />;
          })}
          <div ref={ref}>{isFetchingNextPage ? <Loader /> : <></>}</div>
        </div>
      </>
    );
  }
  return <Navigate to="/" replace />;
};
export default ProfileFeed;
