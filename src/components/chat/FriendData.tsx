import Avatar from "../common/avatar/Avatar";
import Icon from "../../assets/icon.png";
import { StyledChatAuthorContainer } from "./StyledChatAuthorContainer";
import { StyledChatName } from "./StyledChatName";

interface UserPostDataProps {
  name: string;
  profilePicture?: string;
  isFriend?: boolean | undefined;
}
const FriendData = ({
  name,
  profilePicture,
  isFriend = undefined,
}: UserPostDataProps) => {
  return (
    <StyledChatAuthorContainer>
      {isFriend === undefined && (
        <Avatar
          src={profilePicture === null ? Icon : profilePicture!}
          alt={name}
        />
      )}
      <StyledChatName isFriend={isFriend}>{name}</StyledChatName>
    </StyledChatAuthorContainer>
  );
};

export default FriendData;
