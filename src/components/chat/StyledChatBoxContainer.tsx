import styled from "styled-components";
type StyledChatBoxContainerProps = {
  isFriend: boolean | undefined;
};
export const StyledChatBoxContainer = styled.div<StyledChatBoxContainerProps>`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => {
    if (props.isFriend === true) return "lightgrey";
    if (props.isFriend === false) return props.theme.colors.main;
    return props.theme.colors.main;
  }};
  box-sizing: border-box;
  border-radius: 1rem;
  padding: 10px;
  margin: 10px;
`;
