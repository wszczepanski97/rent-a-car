import { FC } from "react";
import { Link, LinkProps } from "ui";

const NavbarListItem: FC<LinkProps> = (props) => (
  <li>
    <Link {...props} />
  </li>
);

export default NavbarListItem;
