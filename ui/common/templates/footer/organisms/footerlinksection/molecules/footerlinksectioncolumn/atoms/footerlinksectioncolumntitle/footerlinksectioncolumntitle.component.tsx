const FooterLinkSectionColumnTitle = ({
  title,
}: FooterLinkSectionColumnTitleProps) => (
  <h5 style={{ color: "var(--light-text-color)", paddingBottom: "20px" }}>
    {title}
  </h5>
);

export type FooterLinkSectionColumnTitleProps = {
  title: string;
};

export default FooterLinkSectionColumnTitle;
