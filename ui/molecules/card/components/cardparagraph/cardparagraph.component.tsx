import { FC } from "react";
import { CardParagraphProps } from "./cardparagraph.props";

const CardParagraph: FC<CardParagraphProps> = ({
  paragraphText,
  color = "var(--second-text-color)",
  as: Tag = "p",
  style,
}) => <Tag style={{ color, ...style }}>{paragraphText}</Tag>;

export default CardParagraph;
