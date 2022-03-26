import { FC } from "react";
import styles from "./footerlinksectioncolumn.module.css";
const FooterLinkSectionColumn: FC = ({ children }) => (
  <div className={styles.footerLinkSectionColumn}>{children}</div>
);

export default FooterLinkSectionColumn;
