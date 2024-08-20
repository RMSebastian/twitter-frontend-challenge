import React, { useEffect } from "react";
import { StyledContainer } from "../../components/common/Container";
import TweetBox from "../../components/tweet-box/TweetBox";

const TweetPage = () => {
  const exit = () => {
    window.history.back();
  };

  useEffect(() => {
    window.innerWidth > 600 && exit();
  }, []);

  return (
    <StyledContainer>
      <TweetBox close={exit} mobile borderless />
    </StyledContainer>
  );
};
export default TweetPage;
