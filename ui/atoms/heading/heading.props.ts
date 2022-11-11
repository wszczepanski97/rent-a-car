import { CSSProperties, ElementType } from "react";

export type HeadingProps = {
  text: string;
  color?: string;
  as?: ElementType;
  style?: CSSProperties;
};
