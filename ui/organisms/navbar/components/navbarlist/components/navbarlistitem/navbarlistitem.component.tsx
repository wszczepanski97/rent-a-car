import { SidebarContext } from "contexts/sidebar.context";
import type { FC } from "react";
import { useContext } from "react";
import Link from "ui/atoms/link";
import styles from "./navbarlistitem.module.scss";
import { NavbarListItemProps } from "./navbarlistitem.props";

const NavbarListItem: FC<NavbarListItemProps> = ({
  name,
  dataIcon,
  href,
  ...rest
}) => {
  const { open } = useContext(SidebarContext);
  return (
    <li
      id={name}
      className={styles.navbarListItem}
      data-icon={dataIcon}
      data-link={href}
    >
      {open ? null : <Link name={name} href={href} {...rest} />}
    </li>
  );
};

export default NavbarListItem;
