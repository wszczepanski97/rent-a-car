import { FC } from "react";
import { Link, LinkProps } from "ui";

type NavbarListItemProps = {
  id: string;
} & LinkProps;

const NavbarListItem: FC<NavbarListItemProps> = ({ id, rest }) => (
  <li style={{ display: "flex", alignItems: "center" }}>
    <Link {...rest} />
  </li>
);

export default NavbarListItem;
