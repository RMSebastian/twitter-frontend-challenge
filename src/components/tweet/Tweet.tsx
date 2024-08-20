import { useEffect, useState } from "react";
import { StyledTweetContainer } from "./TweetContainer";
import AuthorData from "./user-post-data/AuthorData";
import type { PostDTO, ReactionData, ReactionDTO } from "../../service";
import { StyledReactionsContainer } from "./ReactionsContainer";
import Reaction from "./reaction/Reaction";
import { IconType } from "../icon/Icon";
import { StyledContainer } from "../common/Container";
import ThreeDots from "../common/ThreeDots";
import DeletePostModal from "./delete-post-modal/DeletePostModal";
import ImageContainer from "./tweet-image/ImageContainer";
import CommentModal from "../comment/comment-modal/CommentModal";
import { useNavigate } from "react-router-dom";
import { useGetMyUser } from "../../hooks/htttpServicesHooks/user.hooks";
import {
  useDeleteReaction,
  usePostReaction,
} from "../../hooks/htttpServicesHooks/reaction.hooks";
import { useClickAway } from "@uidotdev/usehooks";

interface TweetProps {
  postDto: PostDTO;
}

const Tweet = ({ postDto }: TweetProps) => {
  const [post, setPost] = useState<PostDTO>(postDto);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showCommentModal, setShowCommentModal] = useState<boolean>(false);
  const { data: user } = useGetMyUser();
  const { mutate: createReaction } = usePostReaction(
    post.parentId !== null ? false : true,
    post.parentId !== undefined ? post.parentId : null
  );
  const { mutate: deleteReaction } = useDeleteReaction(
    post.parentId !== null ? false : true,
    post.parentId !== undefined ? post.parentId : null,
    post
  );
  const navigate = useNavigate();
  const deleteModalRef = useClickAway<HTMLDivElement>(() => {
    setShowDeleteModal(false);
  });
  const getCountByType = (type: string): number => {
    return (
      post?.reactions?.filter((r: ReactionDTO) => r.type === type).length ?? 0
    );
  };

  const handleReaction = async (type: string) => {
    const reacted = post.reactions.find(
      (r: ReactionDTO) => r.type === type && r.userId === user?.id
    );
    if (reacted) {
      await deleteReaction(reacted.id);
    } else {
      if (type === "LIKE" || type === "RETWEET") {
        const rdto: ReactionData = {
          type: type,
        };
        await createReaction({ postId: post.id, data: rdto });
      }
    }
  };

  const hasReactedByType = (type: string): boolean => {
    return post.reactions.some(
      (r: ReactionDTO) => r.type === type && r.userId === user?.id
    );
  };

  useEffect(() => {
    setPost(postDto);
  }, [postDto]);
  return (
    <StyledTweetContainer>
      <StyledContainer
        style={{ width: "100%" }}
        flexDirection={"row"}
        alignItems={"center"}
        justifyContent={"center"}
        maxHeight={"48px"}
      >
        <AuthorData
          id={post?.author?.id}
          name={post?.author?.name ?? "Name"}
          username={post?.author?.username}
          createdAt={post?.createdAt}
          profilePicture={post?.author?.image}
        />
        {post.authorId === user?.id && (
          <>
            <DeletePostModal
              reference={deleteModalRef}
              show={showDeleteModal}
              id={post.id}
              onClose={() => {
                setShowDeleteModal(false);
              }}
              parentId={post.parentId}
            />
            <ThreeDots
              onClick={() => {
                setShowDeleteModal(!showDeleteModal);
              }}
            />
          </>
        )}
      </StyledContainer>
      <StyledContainer
        onClick={() => {
          navigate(`/post/${post.id}`, { replace: true });
        }}
      >
        <p>{post.content}</p>
      </StyledContainer>
      {post.images && post.images!.length > 0 && (
        <StyledContainer padding={"0 0 0 8%"}>
          <ImageContainer images={post.images} />
        </StyledContainer>
      )}
      <StyledReactionsContainer>
        <Reaction
          img={IconType.CHAT}
          count={post.comments}
          reactionFunction={() =>
            window.innerWidth > 600
              ? setShowCommentModal(true)
              : navigate(`/comment/${post.id}`)
          }
          increment={0}
          reacted={false}
        />
        <Reaction
          img={IconType.RETWEET}
          count={getCountByType("RETWEET")}
          reactionFunction={() => handleReaction("RETWEET")}
          increment={1}
          reacted={hasReactedByType("RETWEET")}
        />
        <Reaction
          img={IconType.LIKE}
          count={getCountByType("LIKE")}
          reactionFunction={() => handleReaction("LIKE")}
          increment={1}
          reacted={hasReactedByType("LIKE")}
        />
      </StyledReactionsContainer>
      <CommentModal
        show={showCommentModal}
        post={post}
        onClose={() => setShowCommentModal(false)}
      />
    </StyledTweetContainer>
  );
};

export default Tweet;
