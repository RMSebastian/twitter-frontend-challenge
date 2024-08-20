import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { StyledContentContainer } from "../home-page/components/contentContainer/StyledContentContainer";
import { useToken } from "../../hooks/useToken";
import { AuthorDTO, ChatDTO, MessageDTO } from "../../service";
import FriendBox from "../../components/chat/FriendBox";
import { StyledContainer } from "../../components/common/Container";
import { StyledHeaderContainer } from "../home-page/components/header/HeaderContainer";
import { StyledUserSuggestionContainer } from "../home-page/UserSeuggestionContainer";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import Chat from "../../components/chat/Chat";
import { useDispatch } from "react-redux";
import { updateUserId } from "../../redux/chat";
import { StyledH3, StyledH5 } from "../../components/common/text";

// Define la URL del servidor aquí
const URL: string =
  process.env.NODE_ENV === "production"
    ? "https://your-production-url.com"
    : "http://localhost:8080";

const ChatPage = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const { token } = useToken();
  const [friends, SetFriends] = useState<AuthorDTO[]>([]);
  const [actualChat, setActualChat] = useState<ChatDTO | null>(null);
  const { otherUserId } = useSelector((state: RootState) => state.chat);
  const [mobile, setMobile] = useState<boolean>(false);
  const [friendId, setFriendId] = useState<string>("");
  const dispatch = useDispatch();
  useEffect(() => {
    const socketIo = io(URL, {
      extraHeaders: {
        Authorization: token!,
      },
    });

    socketIo.on("connect", () => {
      setSocket(socketIo);
      setFriendId(otherUserId);
      socketIo.emit("joinLobby", {});
    });

    socketIo.on("error", (error) => {
      console.error("Socket error:", error);
    });

    socketIo.on("joinLobby", (object: AuthorDTO[]) => {
      SetFriends(object);
    });

    socketIo.on("createRoom", (object: ChatDTO) => {
      setActualChat(object);
    });

    socketIo.on("createMessage", (object: MessageDTO) => {
      console.log(object);
      setActualChat((prevChat) => {
        if (!prevChat) return null;
        return {
          ...prevChat,
          messages: [...prevChat.messages, object],
        };
      });
    });
    return () => {
      if (socketIo) {
        socketIo.disconnect();
        dispatch(updateUserId(""));
      }
    };
  }, []);

  useEffect(() => {
    if (otherUserId !== "" && socket) {
      socket.emit("createRoom", { otherUserId: otherUserId });
    }
    setFriendId(otherUserId);
  }, [otherUserId]);

  useEffect(() => {
    if (window.innerWidth <= 600) setMobile(true);
    else setMobile(false);
  }, []);
  const createMessage = (chatId: string, content: string) => {
    if (chatId !== "" && content !== "" && socket) {
      socket.emit("createMessage", { chatId: chatId, content: content });
    }
  };

  return (
    <>
      {(!mobile || (mobile && friendId === "")) && (
        <StyledContainer
          maxHeight={"100vh"}
          borderRight={"1px solid #ebeef0"}
          flex={"1 1 0%"}
        >
          <StyledHeaderContainer
            style={{ display: "flex", justifyContent: "space-around" }}
          >
            <p>Friends</p>
          </StyledHeaderContainer>
          <StyledContainer>
            {friends &&
              friends.map((friend, index) => (
                <FriendBox key={index} friend={friend}></FriendBox>
              ))}
          </StyledContainer>
        </StyledContainer>
      )}
      {(!mobile || (mobile && friendId !== "")) && actualChat ? (
        <StyledContainer flex={"2 1 0%"} borderRight={"1px solid #ebeef0"}>
          <Chat chat={actualChat} onClick={createMessage} />
        </StyledContainer>
      ) : (
        <StyledContainer
          flex={"2 1 0%"}
          borderRight={"1px solid #ebeef0"}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <p>select a friend</p>
        </StyledContainer>
      )}
    </>
  );
};

export default ChatPage;
