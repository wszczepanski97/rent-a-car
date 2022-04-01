import { FC } from "react";
import { Photo, PhotoProps } from "../../../../../../../ui/common";

const CardPhoto: FC<PhotoProps> = ({ size, ...rest }) => {
  return <Photo {...size} {...rest} />;
};

export default CardPhoto;
