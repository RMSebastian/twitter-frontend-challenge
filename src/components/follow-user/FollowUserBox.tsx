import { useEffect, useState } from "react";
import Button from "../button/Button";
import UserDataBox from "../user-data-box/UserDataBox";
import { useTranslation } from "react-i18next";
import { ButtonType } from "../button/StyledButton";
import { AuthorDTO } from "../../service";
import { useGetMyUser } from "../../hooks/htttpServicesHooks/user.hooks";
import {
  useFollowUser,
  useUnfollowUser,
} from "../../hooks/htttpServicesHooks/follow.hooks";
import { StyledFollowUserBox } from "./StyledFollowUserBox";

interface FollowUserBoxProps {
  profilePicture?: string;
  name?: string;
  username?: string;
  id: string;
}

const FollowUserBox = ({
  profilePicture,
  name,
  username,
  id,
}: FollowUserBoxProps) => {
  const { t } = useTranslation();
  const { data: user, isLoading } = useGetMyUser();
  const { mutate: followUser } = useFollowUser();
  const { mutate: unfollowUser } = useUnfollowUser();

  const [isFollowing, setIsFollowing] = useState(false);

  const checkFollowingStatus = () => {
    if (user) {
      return user.following.some((f: AuthorDTO) => f.id === id);
    }
    return false;
  };
  useEffect(() => {
    if (user) {
      setIsFollowing(checkFollowingStatus());
    }
  }, [user]);

  const handleFollow = async () => {
    if (isFollowing) {
      await unfollowUser(id);
    } else {
      await followUser(id);
    }
    setIsFollowing(!isFollowing);
  };
  useEffect(() => {}, []);

  return (
    <StyledFollowUserBox>
      <UserDataBox
        id={id}
        name={name!}
        profilePicture={profilePicture!}
        username={username!}
      />
      <Button
        text={
          !isLoading && user
            ? isFollowing
              ? t("buttons.unfollow")
              : t("buttons.follow")
            : t("buttons.follow")
        }
        buttonType={isFollowing ? ButtonType.DELETE : ButtonType.FOLLOW}
        size={"SMALL"}
        onClick={handleFollow}
      />
    </StyledFollowUserBox>
  );
};

export default FollowUserBox;
