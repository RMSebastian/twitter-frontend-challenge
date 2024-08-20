import React, { ChangeEvent, useRef } from "react";
import { StyledContainer } from "./Container";
import Action from "../../assets/action.svg";
import { useToast } from "../toast/ToastProvider";
import { ToastType } from "../toast/Toast";

interface ImageInputProps {
  setImages: (images: File[]) => void;
  parentId?: string;
}

const ImageInput = ({ setImages, parentId }: ImageInputProps) => {
  const fileInputRef = useRef(null);
  const { addToast } = useToast();
  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const uploadedImages = Array.from(files!).slice(0, 4);
      const validImages = uploadedImages.filter((file) =>
        file.type.startsWith("image/")
      );
      if (validImages.length !== uploadedImages.length) {
        addToast({
          message: "Error: a file is not an image",
          type: ToastType.ALERT,
        });
      } else {
        setImages(uploadedImages);
        addToast({
          message: "Images added sucessfully",
          type: ToastType.SUCCESS,
        });
      }
    }
  };

  return (
    <StyledContainer justifyContent={"center"}>
      <label htmlFor={`image-upload-${parentId ?? ""}`}>
        <img src={Action} alt="Upload Images" />
      </label>
      <input
        type="file"
        id={`image-upload-${parentId ?? ""}`}
        accept="image/*"
        multiple
        ref={fileInputRef}
        onChange={handleImageUpload}
        style={{ display: "none" }}
      />
    </StyledContainer>
  );
};

export default ImageInput;
