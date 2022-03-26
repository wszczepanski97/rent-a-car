import Link from "next/link";
import Image from "next/image";
import styles from "./footerlinksectioncolumnlink.module.css";
const FooterLinkSectionColumnLink = ({
  text,
  photoProps,
}: FooterLinkSectionColumnLinkProps) =>
  photoProps ? (
    <div className={styles.columnLinkWithPhoto}>
      <Image height="24" width="24" {...photoProps} />
      <Link href={"#"}>
        <a style={{ color: "var(--light-text-color)" }}>{text}</a>
      </Link>
    </div>
  ) : (
    <Link href={"#"}>
      <a style={{ color: "var(--light-text-color)", paddingBottom: "10px" }}>
        {text}
      </a>
    </Link>
  );

export type FooterLinkSectionColumnLinkProps = {
  text: string;
  photoProps?: {
    src: string;
    alt: string;
  };
};

export default FooterLinkSectionColumnLink;
