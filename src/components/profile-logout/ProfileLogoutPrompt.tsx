import LogoutPrompt from "../navbar/logout-prompt/LogoutPrompt";
import {
  StyledLogoutPrompt,
  StyledProfileLogoutPromptContainer,
} from "./StyledProfileLogoutPromptContainer";
import React, { useEffect, useRef, useState } from "react";
import icon from "../../assets/icon.png";
import { StyledP } from "../common/text";
import { StyledContainer } from "../common/Container";
import { useGetMyUser } from "../../hooks/htttpServicesHooks/user.hooks";
import { useClickAway } from "@uidotdev/usehooks";

interface ProfileLogoutPromptProps {
  margin: string;
  direction: string;
}

const ProfileLogoutPrompt = ({
  margin,
  direction,
}: ProfileLogoutPromptProps) => {
  const [logoutOpen, setLogoutOpen] = useState(false);
  const { data: user } = useGetMyUser();
  const logoutRef = useClickAway<HTMLDivElement>(() => {
    setLogoutOpen(false);
  });

  const handleButtonClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };
  return (
    <StyledContainer
      ref={logoutRef}
      maxHeight={"48px"}
      flexDirection={"row"}
      className={"profile-info"}
      alignItems={"center"}
      gap={"8px"}
      onClick={() => setLogoutOpen(!logoutOpen)}
      cursor={"pointer"}
    >
      <StyledProfileLogoutPromptContainer direction={direction}>
        <img src={user?.image ?? icon} className="icon" alt="Icon" />
        {logoutOpen && (
          <StyledLogoutPrompt
            margin={margin}
            onClick={(event) => handleButtonClick(event)}
            ref={logoutRef}
          >
            <LogoutPrompt show={logoutOpen} reference={logoutRef} />
          </StyledLogoutPrompt>
        )}
      </StyledProfileLogoutPromptContainer>
      <StyledContainer padding={"4px 0"} gap={"4px"} className={"user-info"}>
        <StyledP primary>{user?.name}</StyledP>
        <StyledP primary={false}>{`@${user?.username}`}</StyledP>
      </StyledContainer>
    </StyledContainer>
  );
};

export default ProfileLogoutPrompt;
