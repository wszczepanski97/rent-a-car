import { FC } from "react";
import NextLink from "next/link";

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

export type LinkProps = {
  name: string;
  href: string;
  color?: string;
};

export default Link;
