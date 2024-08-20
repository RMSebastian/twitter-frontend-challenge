import React, { useState } from "react";
import { StyledContentContainer } from "./StyledContentContainer";
import Header from "../header/Header";
import TweetBox from "../../../../components/tweet-box/TweetBox";
import { StyledFeedContainer } from "./FeedContainer";
import ContentFeed from "../../../../components/feed/ContentFeed";
import { StyledContainer } from "../../../../components/common/Container";

const ContentContainer = () => {
  const [mobile, setMobile] = useState<boolean>(window.innerWidth > 600);
  return (
    <StyledContentContainer>
      <StyledFeedContainer>
        <StyledContainer width={"100%"} height={"auto"}>
          <Header />
          {mobile && <TweetBox />}
        </StyledContainer>
        <StyledContainer minHeight={"66vh"} width={"100%"}>
          <ContentFeed />
        </StyledContainer>
      </StyledFeedContainer>
    </StyledContentContainer>
  );
};

export default ContentContainer;
