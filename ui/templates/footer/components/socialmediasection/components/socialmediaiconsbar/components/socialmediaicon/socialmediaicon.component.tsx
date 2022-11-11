import type { FC } from "react";
import Photo from "ui/atoms/photo";
import type { PhotoProps } from "ui/atoms/photo/photo.props";

const SocialMediaIcon: FC<PhotoProps> = (props) => (
  <Photo size={{ height: "24", width: "24" }} {...props} />
);

export default SocialMediaIcon;
