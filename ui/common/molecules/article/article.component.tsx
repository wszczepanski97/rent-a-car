import { CSSProperties, FC } from "react";
import {
  ArticleButtonContainer,
  ArticleButtonContainerProps,
  ArticleParagraph,
  ArticleParagraphProps,
  ArticleTitle,
  ArticleTitleProps,
} from "./ui";

const Article: FC<ArticleProps> = ({
  className,
  style,
  titleProps,
  paragraphProps,
  buttonProps,
}) => (
  <article style={style} className={className}>
    {titleProps && <ArticleTitle {...titleProps} />}
    {paragraphProps && <ArticleParagraph {...paragraphProps} />}
    {buttonProps && <ArticleButtonContainer {...buttonProps} />}
  </article>
);

type ArticleProps = {
  className?: string;
  style?: CSSProperties;
  buttonProps?: ArticleButtonContainerProps;
  titleProps?: ArticleTitleProps;
  paragraphProps?: ArticleParagraphProps;
};

export default Article;
