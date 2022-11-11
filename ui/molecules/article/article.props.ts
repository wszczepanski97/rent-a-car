import { CSSProperties } from "react";
import { ArticleButtonContainerProps } from "./components/articlebuttoncontainer/articlebuttoncontainer.props";
import { ArticleParagraphProps } from "./components/articleparagraph/articleparagraph.props";
import { ArticleTitleProps } from "./components/articletitle/articletitle.props";

export type ArticleProps = {
  className?: string;
  style?: CSSProperties;
  buttonProps?: ArticleButtonContainerProps;
  titleProps?: ArticleTitleProps;
  paragraphProps?: ArticleParagraphProps;
};
