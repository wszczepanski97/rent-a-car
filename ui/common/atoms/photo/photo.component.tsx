import Image from "next/image";
import { FC } from "react";

const Photo: FC<PhotoProps> = ({ size, ...rest }) => {
  return <Image {...size} {...rest} />;
};

type Size = {
  height?: string;
  width?: string;
};

export type PhotoProps = {
  src: string;
  alt: string;
  size?: Size;
};

export default Photo;
