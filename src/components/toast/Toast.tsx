import { StyledToastContainer } from "./ToastContainer";
import { AlertIcon, LikeIcon } from "../icon/Icon";

export enum ToastType {
  ALERT = "ALERT",
  SUCCESS = "SUCCESS",
}

interface ToastProps {
  message: string;
  type: ToastType;
}

const Toast = ({ message, type }: ToastProps) => {
  const iconMap = {
    [ToastType.ALERT]: <AlertIcon />,
    [ToastType.SUCCESS]: <LikeIcon />,
  };

  const toastIcon = iconMap[type] || null;

  return (
    <>
      {
        <StyledToastContainer type={type}>
          {toastIcon}
          <p>{message}</p>
        </StyledToastContainer>
      }
    </>
  );
};

export default Toast;
