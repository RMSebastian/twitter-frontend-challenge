import { useEffect } from "react";
import Feed from "./Feed";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useInView } from "react-intersection-observer";
import Loader from "../loader/Loader";
import {
  useGetFollowPosts,
  useGetPosts,
} from "../../hooks/htttpServicesHooks/post.hooks";

const ContentFeed = () => {
  const { activeFirstPage } = useSelector((state: RootState) => state.post);

  const {
    data: getAllPostData,
    fetchNextPage: fetchGetAllNextPage,
    hasNextPage: hasGetAllNextPage,
    isFetchingNextPage: isFetchingGetAllNextPage,
    isLoading: isGetAllLoading,
  } = useGetPosts();
  const {
    data: getFollowPostData,
    fetchNextPage: fetchGetFollowNextPage,
    hasNextPage: hasGetFollowNextPage,
    isFetchingNextPage: isFetchingGetFollowNextPage,
    isLoading: isGetFollowLoading,
  } = useGetFollowPosts();

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasGetAllNextPage) {
      fetchGetAllNextPage();
    }
    if (inView && hasGetFollowNextPage) {
      fetchGetFollowNextPage();
    }
  }, [fetchGetAllNextPage, fetchGetFollowNextPage, inView]);
  return (
    <>
      {activeFirstPage ? (
        <div style={{ overflowY: "scroll" }}>
          {getAllPostData?.pages.map((d, index) => {
            return (
              <Feed
                key={index}
                posts={activeFirstPage ? d : []}
                loading={isGetAllLoading}
              />
            );
          })}
          <div ref={ref}>{isFetchingGetAllNextPage ? <Loader /> : <></>}</div>
        </div>
      ) : (
        <div style={{ overflowY: "scroll" }}>
          {getFollowPostData?.pages.map((d, index) => {
            return (
              <Feed
                key={index}
                posts={!activeFirstPage ? d : []}
                loading={isGetFollowLoading}
              />
            );
          })}
          <div ref={ref}>
            {isFetchingGetFollowNextPage ? <Loader /> : <></>}
          </div>
        </div>
      )}
    </>
  );
};

export default ContentFeed;
