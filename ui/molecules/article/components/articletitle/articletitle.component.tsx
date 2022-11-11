import { FC } from "react";
import { ArticleTitleProps } from "./articletitle.props";

const ArticleTitle: FC<ArticleTitleProps> = ({
  title,
  color = "var(--light-text-color)",
  lowerCase,
  as: Tag = "h1",
}) => <Tag style={{ color }}>{lowerCase ? title : title.toUpperCase()}</Tag>;

export default ArticleTitle;
