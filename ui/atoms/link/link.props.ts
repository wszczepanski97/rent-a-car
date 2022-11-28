import { CSSProperties, ElementType } from "react";

export type LinkProps = {
  name: string;
  href: string;
  color?: string;
  as?: ElementType;
  style?: CSSProperties;
};
