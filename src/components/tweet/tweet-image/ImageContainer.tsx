import React from "react";
import TweetImage from "./TweetImage";
import {
  StyledContainer,
  StyledOverflowContainer,
} from "../../common/Container";

interface ImageContainerProps {
  images: string[];
  editable?: boolean;
  removeFunction?: (index: number) => void;
  isModal?: boolean;
}
const ImageContainer = ({
  images,
  editable,
  removeFunction,
  isModal,
}: ImageContainerProps) => {
  const size: number = isModal && images!.length > 2 ? 130 : 300;

  return (
    <StyledContainer
      maxWidth={"100%"}
      alignItems={"flex-end"}
      gap={"8px"}
      objectFit="fill"
    >
      <StyledOverflowContainer
        flexDirection={"row"}
        gap={"8px"}
        maxHeight={"50%"}
      >
        {images.slice(0, 2).map((image, index) => (
          <TweetImage
            key={image}
            src={image}
            alt={image}
            removable={editable}
            removeFunction={() =>
              removeFunction ? removeFunction(index) : console.log("")
            }
            size={size}
          />
        ))}
      </StyledOverflowContainer>
      {images && images!.length > 2 && (
        <StyledOverflowContainer
          flexDirection={"row"}
          gap={"8px"}
          maxHeight={"50%"}
        >
          {images.slice(2, images.length).map((image, index) => (
            <TweetImage
              key={image}
              src={image}
              alt={image}
              removable={editable}
              removeFunction={() =>
                removeFunction ? removeFunction(index + 2) : console.log("")
              }
              size={size}
            />
          ))}
        </StyledOverflowContainer>
      )}
    </StyledContainer>
  );
};

export default ImageContainer;
