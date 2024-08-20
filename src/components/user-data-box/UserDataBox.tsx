import Avatar from "../common/avatar/Avatar";
import icon from "../../assets/icon.png";
import { useNavigate } from "react-router-dom";
import { StyledUserContainer } from "./StyledUserContainer";
import { StyledUserInfoContainer } from "./StyledUserInfoContainer";
import { StyledUserParagraph } from "./StyledUserParagraph";

interface UserDataBoxProps {
  name?: string;
  username?: string;
  profilePicture?: string;
  id: string;
  onClick?: () => void;
}
export const UserDataBox = ({
  name,
  username,
  profilePicture,
  id,
  onClick,
}: UserDataBoxProps) => {
  const navigate = useNavigate();

  return (
    <StyledUserContainer>
      <Avatar
        width={"48px"}
        height={"48px"}
        src={profilePicture ?? icon}
        onClick={() => onClick ?? navigate(`/profile/${id}`)}
        alt={name ?? "Name"}
      />
      <StyledUserInfoContainer>
        <StyledUserParagraph>{name ?? "Name"}</StyledUserParagraph>
        <StyledUserParagraph style={{ color: "#566370" }}>
          {"@" + username ?? "@Username"}
        </StyledUserParagraph>
      </StyledUserInfoContainer>
    </StyledUserContainer>
  );
};

export default UserDataBox;
