import classnames from "classnames";
import { SidebarContext } from "contexts/sidebar-context";
import { FC, useContext } from "react";
import styles from "./layout.module.scss";

const Layout: FC = ({ children }) => {
  const { active } = useContext(SidebarContext);
  return <div className={classnames(styles.layout, {[styles.sidebarActive]})}>{children}</div>;
};

export default Layout;
