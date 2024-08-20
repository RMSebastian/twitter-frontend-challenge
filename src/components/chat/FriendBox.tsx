import { AuthorDTO } from "../../service";
import FriendData from "./FriendData";
import { StyledTweetContainer } from "../tweet/TweetContainer";
import { useDispatch } from "react-redux";
import { updateUserId } from "../../redux/chat";

type FriendBoxProps = {
  friend: AuthorDTO;
};
const FriendBox = ({ friend }: FriendBoxProps) => {
  const dispatch = useDispatch();

  return (
    <>
      <StyledTweetContainer
        onClick={() => dispatch(updateUserId(friend.id))}
        style={{ cursor: "pointer" }}
      >
        <FriendData
          name={friend?.name ?? "Name"}
          profilePicture={friend?.image}
        />
      </StyledTweetContainer>
    </>
  );
};

export default FriendBox;
