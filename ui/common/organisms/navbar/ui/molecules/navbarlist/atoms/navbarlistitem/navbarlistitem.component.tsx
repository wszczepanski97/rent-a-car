import { FC } from "react";
import { Link, LinkProps } from "ui";

type NavbarListItemProps = LinkProps;

const NavbarListItem: FC<NavbarListItemProps> = ({ name, ...rest }) => (
  <li id={name} style={{ display: "flex", alignItems: "center" }}>
    <Link name={name} {...rest} />
  </li>
);

export default NavbarListItem;
