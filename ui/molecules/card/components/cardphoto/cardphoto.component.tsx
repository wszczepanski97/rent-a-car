import type { FC } from "react";
import Photo from "ui/atoms/photo";
import { PhotoProps } from "ui/atoms/photo/photo.props";

const CardPhoto: FC<PhotoProps> = ({ size, ...rest }) => (
  <Photo {...size} {...rest} />
);

export default CardPhoto;
