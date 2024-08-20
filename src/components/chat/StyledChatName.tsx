import styled from "styled-components";

type StyledChatNameProps = {
  isFriend: boolean | undefined;
};
export const StyledChatName = styled.p<StyledChatNameProps>`
  display: flex;
  justify-content: ${(props) => {
    if (props.isFriend === true) return "flex-end";
    if (props.isFriend === false) return "flex-start";
    return "flex-start";
  }};
  padding-left: 1rem;
  padding-right: 1rem;
  width: 100%;
  color: ${(props) => props.theme.colors.black};
  font-size: 15px;
  font-family: "Manrope", sans-serif;
  font-weight: 600;
  line-height: 110%;
  letter-spacing: -0.15px;
  margin: 0;
`;
