import { FC } from "react";
import { Photo, PhotoProps } from "ui";

const SocialMediaIcon: FC<PhotoProps> = (props) => (
  <Photo size={{ height: "24", width: "24" }} {...props} />
);

export default SocialMediaIcon;
