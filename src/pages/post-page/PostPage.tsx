import { StyledContainer } from "../../components/common/Container";
import { StyledH5 } from "../../components/common/text";
import { StyledFeedContainer } from "../home-page/components/contentContainer/FeedContainer";
import Tweet from "../../components/tweet/Tweet";
import CommentFeed from "../../components/feed/CommentFeed";
import TweetBox from "../../components/tweet-box/TweetBox";
import Loader from "../../components/loader/Loader";
import { useGetPostById } from "../../hooks/htttpServicesHooks/post.hooks";
import { useParams } from "react-router-dom";

const PostPage = () => {
  //Use State
  const { id: postId } = useParams();
  //Proper Hooks
  const { data, isLoading } = useGetPostById(postId!);
  return (
    <>
      <StyledContainer borderRight={"1px solid #ebeef0"} flex={"2.5 1 0%"}>
        <StyledFeedContainer>
          <StyledContainer
            padding={"16px"}
            borderBottom={"1px solid #ebeef0"}
            maxHeight={"53px"}
            flex={"0.5 1 0%"}
          >
            <StyledH5>Tweet</StyledH5>
          </StyledContainer>
          {data && !isLoading ? (
            <>
              <StyledContainer flex={"2.5 1 0%"} overflow="scroll">
                <Tweet postDto={data} />
              </StyledContainer>

              <StyledContainer flex={"1 1 0%"}>
                <TweetBox parentId={postId} />
              </StyledContainer>
            </>
          ) : (
            <StyledContainer justifyContent={"center"} alignItems={"center"}>
              <Loader />
            </StyledContainer>
          )}
        </StyledFeedContainer>
      </StyledContainer>
      <StyledContainer height={"100%"} flex={"1 1 0%"}>
        <CommentFeed postId={postId!} />
      </StyledContainer>
    </>
  );
};

export default PostPage;
