import React, { ChangeEvent, useRef, useState } from "react";
import { StyledInputContainer } from "./InputContainer";
import { StyledInputTitle } from "./InputTitle";
import { StyledInputElement } from "./StyledInputElement";
import { ErrorMessage, Field } from "formik";

interface InputWithLabelProps {
  type?: "password" | "text";
  name: string;
  title: string;
  placeholder: string;
  required: boolean;
  error?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const LabeledInput = ({
  name,
  title,
  placeholder,
  required,
  error,
  onChange,
  type = "text",
}: InputWithLabelProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [focus, setFocus] = useState(false);

  const handleFocus = () => {
    setFocus(true);
  };

  const handleBlur = () => {
    setFocus(false);
  };

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <>
      <StyledInputContainer
        className={`${error ? "error" : ""}`}
        onClick={handleClick}
        onFocus={handleFocus}
        onBlur={handleBlur}
      >
        <StyledInputTitle
          className={`${focus ? "active-label" : ""} ${error ? "error" : ""}`}
        >
          {title}
        </StyledInputTitle>
        <Field name={name}>
          {({ field }: any) => (
            <>
              <StyledInputElement
                type={type}
                required={required}
                placeholder={placeholder}
                className={error ? "error" : ""}
                ref={inputRef}
                {...field}
              />
            </>
          )}
        </Field>
      </StyledInputContainer>
      <ErrorMessage name={name} component="p" className="error-message" />
    </>
  );
};

export default LabeledInput;
