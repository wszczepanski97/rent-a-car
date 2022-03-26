import Image from "next/image";

const CardPhoto = ({ size, ...rest }: CardPhotoProps) => {
  return <Image {...size} {...rest} />;
};

type Size = {
  height?: string;
  width?: string;
};

export type CardPhotoProps = {
  src: string;
  alt: string;
  size?: Size;
};

export default CardPhoto;
