import type { FC } from "react";
import Link from "ui/atoms/link";
import Photo from "ui/atoms/photo";
import styles from "./footerlinksectioncolumnlink.module.scss";
import { FooterLinkSectionColumnLinkProps } from "./footerlinksectioncolumnlink.props";

const FooterLinkSectionColumnLink: FC<FooterLinkSectionColumnLinkProps> = ({
  text,
  photoProps,
}) =>
  photoProps ? (
    <div className={styles.columnLinkWithPhoto}>
      <Photo size={{ height: "24", width: "24" }} {...photoProps} />
      <Link href="" name={text} />
    </div>
  ) : (
    <Link href="" name={text} />
  );

export default FooterLinkSectionColumnLink;
