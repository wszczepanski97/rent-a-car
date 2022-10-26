import { FC } from "react";
import { Link, LinkProps } from "ui";

type NavbarListItemProps = {
  id: string;
} & LinkProps;

const NavbarListItem: FC<NavbarListItemProps> = (props) => (
  <li style={{ display: "flex", alignItems: "center" }}>
    <Link {...props} />
  </li>
);

export default NavbarListItem;
