import NextLink from "next/link";
import type { FC } from "react";
import { LinkProps } from "./link.props";

const Link: FC<LinkProps> = ({
  name,
  href,
  color = "var(--light-text-color)",
}) => {
  return (
    <NextLink href={href}>
      <a style={{ color }}>{name}</a>
    </NextLink>
  );
};

export default Link;
