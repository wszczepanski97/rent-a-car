import NextLink from "next/link";
import type { FC } from "react";
import { LinkProps } from "./link.props";

const Link: FC<LinkProps> = ({
  name,
  href,
  color = "var(--light-text-color)",
  as: Tag = "a",
  style,
}) => {
  return (
    <NextLink href={href} legacyBehavior>
      <Tag style={{ color, ...style }}>{name}</Tag>
    </NextLink>
  );
};

export default Link;
