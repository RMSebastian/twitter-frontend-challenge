import React, { MouseEventHandler } from "react";
import { ButtonType, StyledButton } from "./StyledButton";

interface ButtonProps {
  text: string;
  size: string;
  buttonType: ButtonType;
  onClick?: MouseEventHandler;
  disabled?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
}
const Button = ({
  text,
  size,
  buttonType,
  onClick,
  disabled,
  type,
}: ButtonProps) => {
  return (
    <StyledButton
      type={type}
      size={size}
      buttonType={disabled ? ButtonType.DISABLED : buttonType}
      disabled={buttonType === "DISABLED" || (disabled ? disabled : false)}
      onClick={onClick}
    >
      {text}
    </StyledButton>
  );
};

export default Button;
