import { useState } from "react";
import Tab from "./tab/Tab";
import { useTranslation } from "react-i18next";
import { StyledTabBarContainer } from "./TabBarContainer";
import { useDispatch, useSelector } from "react-redux";
import { updatePage } from "../../../../../redux/post";
import { RootState } from "../../../../../redux/store";

const TabBar = () => {
  const { activeFirstPage } = useSelector((state: RootState) => state.post);
  const [activePage, setActivePage] = useState(activeFirstPage);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const handleClick = async (value: boolean, query: string) => {
    setActivePage(value);
    dispatch(updatePage(value));
  };

  return (
    <>
      <StyledTabBarContainer>
        <Tab
          active={activePage}
          text={t("header.for-you")}
          onClick={() => handleClick(true, "")}
        />
        <Tab
          active={!activePage}
          text={t("header.following")}
          onClick={() => handleClick(false, "following")}
        />
      </StyledTabBarContainer>
    </>
  );
};

export default TabBar;
