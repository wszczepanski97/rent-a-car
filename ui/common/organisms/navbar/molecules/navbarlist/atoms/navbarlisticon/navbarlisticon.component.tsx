import Image from "next/image";

const NavbarListIcon = (props: NavbarListphotoProps) => (
  <Image {...props} height="16" width="16" />
);

type NavbarListphotoProps = {
  src: string;
  alt: string;
};

export default NavbarListIcon;
