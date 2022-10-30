import { FC } from "react";
import { Link, LinkProps } from "ui";
import styles from "./navbarlistitem.module.scss";

type NavbarListItemProps = LinkProps & {
  dataIcon?: string;
};

const NavbarListItem: FC<NavbarListItemProps> = ({
  name,
  dataIcon,
  href,
  ...rest
}) => (
  <li
    id={name}
    className={styles.navbarListItem}
    data-icon={dataIcon}
    data-link={href}
  >
    <Link name={name} href={href} {...rest} />
  </li>
);

export default NavbarListItem;
