import styled from "styled-components";
type StyledTweetImageProps = {
  size: number | undefined;
};
export const StyledTweetImage = styled.img<StyledTweetImageProps>`
  width: 100%;
  height: 100%;
  max-height: 300px;
  min-height: ${(props) => {
    if (props.size === undefined) return "300px";
    if (props.size !== undefined) return `${props.size}px`;
    return props.theme.colors.main;
  }};
  transform-origin: center center;
  object-fit: cover;
  border-radius: 0.5rem;
`;
