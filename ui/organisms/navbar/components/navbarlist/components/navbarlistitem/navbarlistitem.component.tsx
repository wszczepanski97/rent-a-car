import { SidebarContext } from "contexts/sidebar.context";
import { signOut } from "next-auth/react";
import { FC, useContext, useEffect, useState } from "react";
import Link from "ui/atoms/link";
import styles from "./navbarlistitem.module.scss";
import { NavbarListItemProps } from "./navbarlistitem.props";

const NavbarListItem: FC<NavbarListItemProps> = ({
  name,
  dataIcon,
  href,
  logout,
  ...rest
}) => {
  const [active, setActive] = useState(false);
  const { open } = useContext(SidebarContext);
  useEffect(() => {
    if (typeof window !== "undefined" && href === window.location.pathname) {
      setActive(true);
    } else {
      setActive(false);
    }
  });

  return (
    <li
      id={name}
      className={styles.navbarListItem}
      data-icon={dataIcon}
      data-link={href}
      onClick={() => {
        logout && signOut({ redirect: true, callbackUrl: "/" });
      }}
    >
      {open ? null : (
        <Link
          name={name}
          href={href}
          style={{
            fontWeight: active ? 700 : 600,
            opacity: active ? 1 : 0.6,
          }}
          {...rest}
        />
      )}
    </li>
  );
};

export default NavbarListItem;
