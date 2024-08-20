import { ChatDTO } from "../../service";
import { useGetMyUser } from "../../hooks/htttpServicesHooks/user.hooks";
import { StyledContainer } from "../common/Container";
import ChatBox from "./ChatBox";
import FriendData from "./FriendData";
import { BackArrowIcon, Icon, IconType } from "../icon/Icon";
import { StyledIconContainer } from "./StyledIconContainer";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { updateUserId } from "../../redux/chat";
import { useTranslation } from "react-i18next";

type ChatProps = {
  chat: ChatDTO;
  onClick: (chatId: string, content: string) => void;
};

const Chat = ({ chat, onClick }: ChatProps) => {
  const [mobile, setMobile] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const { data, isLoading } = useGetMyUser();
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };
  const exit = () => {
    dispatch(updateUserId(""));
  };
  const isOtherUser = () => {
    return chat.users.find((user) => data?.id !== user.id);
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleClick();
    }
  };

  const handleClick = () => {
    if (query !== "") {
      onClick(chat.id, query);
      setQuery("");
    }
  };
  const friend = isOtherUser();

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView();
    }
  }, [chat.messages]);
  useEffect(() => {
    if (window.innerWidth <= 600) setMobile(true);
    else setMobile(false);
  }, []);
  return (
    <StyledContainer
      display="flex"
      width="100%"
      justifyContent="space-between"
      marginBottom="2rem"
      height={mobile ? "90%" : "95%"}
      position="relative"
    >
      <StyledContainer
        flexDirection={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        borderBottom={"1px solid #ebeef0"}
        height={"66px"}
      >
        {mobile && <BackArrowIcon onClick={exit} />}
        <FriendData
          name={friend?.name ?? "Name"}
          profilePicture={friend?.image}
        />
      </StyledContainer>
      <StyledContainer
        overflowY="auto"
        height="100%"
        display="flex"
        flexDirection="column"
      >
        {!isLoading &&
          data &&
          chat.messages.map((message, index) => (
            <ChatBox
              key={index}
              message={message}
              isFriend={message.senderId !== data.id}
            ></ChatBox>
          ))}
        <div ref={messagesEndRef} />
      </StyledContainer>
      <StyledContainer
        flexDirection={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        borderTop={"1px solid #ebeef0"}
        height={"auto"}
      >
        <input
          type="text"
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={t("placeholder.message")}
          style={{
            padding: "10px",
            boxSizing: "content-box",
            borderRadius: "30px",
            display: "flex",
            width: "100%",
            borderColor: "transparent",
            outline: "2px solid #b8b8c9",
            margin: "10px",
          }}
        />
        <StyledIconContainer>
          {
            Icon({
              width: "16px",
              height: "16px",
              onClick: handleClick,
              active: true,
            })[IconType.BACK_ARROW]
          }
        </StyledIconContainer>
      </StyledContainer>
    </StyledContainer>
  );
};

export default Chat;
