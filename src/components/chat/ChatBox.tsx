import React from "react";
import FriendData from "./FriendData";
import { MessageDTO } from "../../service";
import { StyledChatBoxContainer } from "./StyledChatBoxContainer";
import { StyledChatText } from "./StyledChatText";
import { StyledChatMessageDate } from "./StyledChatMessageDate";

type ChatBoxProps = {
  message: MessageDTO;
  isFriend: boolean;
};

const ChatBox = ({ message, isFriend }: ChatBoxProps) => {
  return (
    <>
      <StyledChatBoxContainer isFriend={isFriend}>
        <FriendData
          name={message.sender?.name ?? "Name"}
          profilePicture={message.sender?.image}
          isFriend={isFriend}
        />
        <StyledChatText>{message.content}</StyledChatText>
        <StyledChatMessageDate>
          {new Date(message.createdAt).toLocaleString("default", {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })}
        </StyledChatMessageDate>
      </StyledChatBoxContainer>
    </>
  );
};

export default ChatBox;
