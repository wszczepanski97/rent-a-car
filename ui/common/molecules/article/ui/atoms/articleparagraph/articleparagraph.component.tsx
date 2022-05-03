import { ElementType, FC } from "react";

const ArticleParagraph: FC<ArticleParagraphProps> = ({
  paragraphText,
  color = "var(--light-text-color)",
  as: Tag = "h4",
}) => (
  <>
    {paragraphText.split("\n").map((chunk) => (
      <Tag style={{ color }}>{chunk}</Tag>
    ))}
  </>
);

export type ArticleParagraphProps = {
  paragraphText: string;
  color?: string;
  as?: ElementType;
};

export default ArticleParagraph;
