import { FC } from "react";
import { Link, LinkProps } from "ui";
import styles from "./navbarlistitem.module.scss";

type NavbarListItemProps = LinkProps;

const NavbarListItem: FC<NavbarListItemProps> = ({ name, ...rest }) => (
  <li id={name} className={styles.navbarListItem}>
    <Link name={name} {...rest} />
  </li>
);

export default NavbarListItem;
