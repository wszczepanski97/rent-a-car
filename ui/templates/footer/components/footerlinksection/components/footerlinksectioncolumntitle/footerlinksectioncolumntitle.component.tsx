import type { FC } from "react";
import Heading from "ui/atoms/heading";
import { HeadingProps } from "ui/atoms/heading/heading.props";

const FooterLinkSectionColumnTitle: FC<HeadingProps> = (props) => (
  <Heading
    as="h5"
    style={{ color: "var(--light-text-color)", paddingBottom: "10px" }}
    {...props}
  />
);

export default FooterLinkSectionColumnTitle;
