import Image from "next/image";
import type { FC } from "react";
import { PhotoProps } from "./photo.props";

const Photo: FC<PhotoProps> = ({ size, ...rest }) => (
  <Image {...size} {...rest} />
);

export default Photo;
