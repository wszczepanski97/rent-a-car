import { CSSProperties, ElementType } from "react";

export type CardParagraphProps = {
  paragraphText: string;
  color?: string;
  as?: ElementType;
  style?: CSSProperties;
};
