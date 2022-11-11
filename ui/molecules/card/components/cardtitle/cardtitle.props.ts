import { CSSProperties, ElementType } from "react";

export type CardTitleProps = {
  title: string;
  color?: string;
  as?: ElementType;
  style?: CSSProperties;
};
