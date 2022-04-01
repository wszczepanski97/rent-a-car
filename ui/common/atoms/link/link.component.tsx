import { FC } from "react";
import NextLink from "next/link";

const Link: FC<LinkProps> = ({ name, href }) => {
  return (
    <NextLink href={href}>
      <a style={{ color: "var(--light-text-color)" }}>{name}</a>
    </NextLink>
  );
};

export type LinkProps = {
  name: string;
  href: string;
};

export default Link;
