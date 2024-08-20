import FollowUserBox from "../../../../components/follow-user/FollowUserBox";
import { useTranslation } from "react-i18next";
import { StyledSuggestionBoxContainer } from "./SuggestionBoxContainer";
import { useGetRecommendedUsers } from "../../../../hooks/htttpServicesHooks/user.hooks";

const SuggestionBox = () => {
  const { t } = useTranslation();
  const { data: users, isLoading } = useGetRecommendedUsers(6, undefined);

  return (
    <StyledSuggestionBoxContainer>
      <h6>{t("suggestion.who-to-follow")}</h6>
      {!isLoading && users && users.length > 0 ? (
        users
          .filter((user, index, array) => array.indexOf(user) === index)
          .slice(0, 5)
          .map((user) => (
            <FollowUserBox
              key={user.id}
              id={user.id}
              name={user.name}
              username={user.username}
              profilePicture={user.image}
            />
          ))
      ) : (
        <p>{t("suggestion.no-recommendations")}</p>
      )}
      {!isLoading && users && users.length > 5 && (
        <a href="/recommendations">{t("suggestion.show-more")}</a>
      )}
    </StyledSuggestionBoxContainer>
  );
};

export default SuggestionBox;
