import { FC } from "react";
import { Link, Photo } from "ui";
import styles from "./footerlinksectioncolumnlink.module.scss";

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

export type FooterLinkSectionColumnLinkProps = {
  text: string;
  photoProps?: {
    src: string;
    alt: string;
  };
};

export default FooterLinkSectionColumnLink;
