import { CSSProperties, ElementType, FC } from "react";

const CardParagraph: FC<CardParagraphProps> = ({
  paragraphText,
  color = "var(--second-text-color)",
  as: Tag = "p",
  style,
}) => <Tag style={{ color, ...style }}>{paragraphText}</Tag>;

export type CardParagraphProps = {
  paragraphText: string;
  color?: string;
  as?: ElementType;
  style?: CSSProperties;
};

export default CardParagraph;
