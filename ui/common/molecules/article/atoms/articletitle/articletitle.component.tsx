import { ElementType } from "react";

const ArticleTitle = ({
  title,
  color = "var(--light-text-color)",
  lowerCase,
  as: Tag = "h1",
}: ArticleTitleProps) => (
  <Tag style={{ color }}>{lowerCase ? title : title.toUpperCase()}</Tag>
);

export type ArticleTitleProps = {
  title: string;
  color?: string;
  lowerCase?: boolean;
  as?: ElementType;
};

export default ArticleTitle;
