import Image from "next/image";

const SocialMediaIcon = (props: SocialMediaIconProps) => (
  <Image height="24" width="24" {...props} />
);

type SocialMediaIconProps = {
  src: string;
  alt: string;
};

export default SocialMediaIcon;
