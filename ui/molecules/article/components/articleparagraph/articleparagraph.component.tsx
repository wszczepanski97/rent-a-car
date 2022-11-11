import type { FC } from "react";
import { ArticleParagraphProps } from "./articleparagraph.props";

const ArticleParagraph: FC<ArticleParagraphProps> = ({
  paragraphText,
  color = "var(--light-text-color)",
  as: Tag = "h4",
}) => (
  <>
    {paragraphText.split("\n").map((chunk, index) => (
      <Tag key={index} style={{ color }}>
        {chunk}
      </Tag>
    ))}
  </>
);

export default ArticleParagraph;
