import classnames from "classnames/bind";
import { FC } from "react";
import styles from "./footerlinksectioncolumn.module.scss";

const cx = classnames.bind(styles);

const FooterLinkSectionColumn: FC = ({ children }) => (
  <div className={cx(styles.footerLinkSectionColumn)}>{children}</div>
);

export default FooterLinkSectionColumn;
