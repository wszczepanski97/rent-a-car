import { ElementType, FC } from "react";

const ArticleParagraph: FC<ArticleParagraphProps> = ({
  paragraphText,
  color = "var(--light-text-color)",
  as: Tag = "h4",
}) => <Tag style={{ color }}>{paragraphText}</Tag>;

export type ArticleParagraphProps = {
  paragraphText: string;
  color?: string;
  as?: ElementType;
};

export default ArticleParagraph;
