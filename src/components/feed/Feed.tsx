import { PostDTO } from "../../service";
import { StyledContainer } from "../common/Container";
import Tweet from "../tweet/Tweet";

interface FeedProps {
  posts: PostDTO[];
  loading: boolean;
}

const Feed = ({ posts, loading }: FeedProps) => {
  return (
    <StyledContainer width={"100%"} alignItems={"center"} height={"auto"}>
      {posts.length > 0 ? (
        posts
          .filter((post, index, self) => {
            return self.findIndex((p) => p.id === post.id) === index;
          })
          .map((post: PostDTO) => <Tweet key={post.id} postDto={post} />)
      ) : (
        <></>
      )}
    </StyledContainer>
  );
};

export default Feed;
