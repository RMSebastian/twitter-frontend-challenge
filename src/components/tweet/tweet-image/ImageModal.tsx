import { StyledBlurredBackground } from "../../common/BlurredBackground";
import ReactDom from "react-dom";
interface ImageModalProps {
  src: string;
  alt: string;
  onClose: () => void;
  show: boolean;
}
const ImageModal = ({ src, alt, onClose, show }: ImageModalProps) => {
  return ReactDom.createPortal(
    <>
      {show && (
        <StyledBlurredBackground
          onClick={onClose}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <img
            style={{ maxWidth: "600px" }}
            width={"100%"}
            height={"auto"}
            src={src}
            alt={alt}
            onClick={onClose}
          />
        </StyledBlurredBackground>
      )}
    </>,
    document.getElementById("portal")!
  );
};

export default ImageModal;
