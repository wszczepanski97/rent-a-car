import { FC } from "react";
import { Heading, HeadingProps } from "../../../../../../../../../../ui/common";

const FooterLinkSectionColumnTitle: FC<HeadingProps> = (props) => (
  <Heading
    as="h5"
    style={{ color: "var(--light-text-color)", paddingBottom: "10px" }}
    {...props}
  />
);

export default FooterLinkSectionColumnTitle;
