import { useState } from "react";
import ProfileInfo from "./ProfileInfo";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../../components/modal/Modal";
import { useTranslation } from "react-i18next";
import { ButtonType } from "../../components/button/StyledButton";
import Button from "../../components/button/Button";
import ProfileFeed from "../../components/feed/ProfileFeed";
import { StyledContainer } from "../../components/common/Container";
import { StyledH5 } from "../../components/common/text";
import {
  useDeleteUser,
  useGetMyUser,
  useGetUserById,
} from "../../hooks/htttpServicesHooks/user.hooks";
import {
  useFollowUser,
  useUnfollowUser,
} from "../../hooks/htttpServicesHooks/follow.hooks";
import { useToast } from "../../components/toast/ToastProvider";
import { ToastType } from "../../components/toast/Toast";

const ProfilePage = () => {
  const [following, setFollowing] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalValues, setModalValues] = useState({
    text: "",
    title: "",
    type: ButtonType.DEFAULT,
    buttonText: "",
  });
  const { addToast } = useToast();

  const id = useParams().id;
  const navigate = useNavigate();

  const { t } = useTranslation();

  const { data: user, isLoading: loadingUser } = useGetMyUser();
  const { data: profile } = useGetUserById(id || "");
  const { mutate: unfollowUser } = useUnfollowUser();
  const { mutate: followUser } = useFollowUser();
  const { deleteUser } = useDeleteUser();
  if (!id) return null;

  const handleButtonType = (): { component: ButtonType; text: string } => {
    if (profile?.id === user?.id)
      return { component: ButtonType.DELETE, text: t("buttons.delete") };
    if (following)
      return { component: ButtonType.OUTLINED, text: t("buttons.unfollow") };
    else return { component: ButtonType.FOLLOW, text: t("buttons.follow") };
  };

  const handleSubmit = () => {
    if (profile?.id === user?.id) {
      deleteUser().then(() => {
        localStorage.removeItem("token");
        navigate("/sign-in");
        addToast({
          message: "User deleted Successfully ",
          type: ToastType.SUCCESS,
        });
      });
    } else {
      unfollowUser(profile!.id);
      setFollowing(false);
      setShowModal(false);
    }
  };

  const handleButtonAction = async () => {
    if (profile?.id === user?.id) {
      setShowModal(true);
      setModalValues({
        title: t("modal-title.delete-account"),
        text: t("modal-content.delete-account"),
        type: ButtonType.DELETE,
        buttonText: t("buttons.delete"),
      });
    } else {
      if (following) {
        setShowModal(true);
        setModalValues({
          text: t("modal-content.unfollow"),
          title: `${t("modal-title.unfollow")} @${profile?.username}?`,
          type: ButtonType.FOLLOW,
          buttonText: t("buttons.unfollow"),
        });
      } else {
        await followUser(id);
      }
    }
  };
  return (
    <>
      <StyledContainer borderRight={"1px solid #ebeef0"} flex={"2.5 1 0%"}>
        {profile && (
          <>
            <StyledContainer
              borderBottom={"1px solid #ebeef0"}
              maxHeight={"212px"}
              padding={"16px"}
              height={"30%"}
            >
              <StyledContainer
                alignItems={"center"}
                padding={"24px 0 0 0"}
                flexDirection={"row"}
              >
                <ProfileInfo
                  name={profile!.name!}
                  username={profile!.username}
                  profilePicture={profile!.image}
                />
                <Button
                  buttonType={handleButtonType().component}
                  size={"100px"}
                  onClick={handleButtonAction}
                  text={handleButtonType().text}
                  disabled={loadingUser}
                />
              </StyledContainer>
            </StyledContainer>
            <StyledContainer width={"100%"} height={"80%"}>
              {profile.followers ? (
                <ProfileFeed />
              ) : (
                <StyledH5>Private account</StyledH5>
              )}
            </StyledContainer>
            <Modal
              show={showModal}
              text={modalValues.text}
              title={modalValues.title}
              acceptButton={
                <Button
                  buttonType={modalValues.type}
                  text={modalValues.buttonText}
                  size={"MEDIUM"}
                  onClick={handleSubmit}
                  disabled={loadingUser}
                />
              }
              onClose={() => {
                setShowModal(false);
              }}
            />
          </>
        )}
      </StyledContainer>
      <StyledContainer flex={"1 1 0%"}></StyledContainer>
    </>
  );
};

export default ProfilePage;
