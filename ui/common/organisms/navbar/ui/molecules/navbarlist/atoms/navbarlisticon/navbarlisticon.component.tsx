import { FC } from "react";
import { Photo, PhotoProps } from "../../../../../../../../../ui/common";

const NavbarListIcon: FC<PhotoProps> = (props) => (
  <Photo {...props} size={{ height: "16", width: "16" }} />
);

export default NavbarListIcon;
