import { CSSProperties, FC } from "react";
import {
  ArticleButtonsContainer,
  ArticleButtonsContainerProps,
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
  buttonsProps,
}) => (
  <article style={style} className={className}>
    {titleProps && <ArticleTitle {...titleProps} />}
    {paragraphProps && <ArticleParagraph {...paragraphProps} />}
    {buttonsProps && <ArticleButtonsContainer {...buttonsProps} />}
  </article>
);

type ArticleProps = {
  className?: string;
  style?: CSSProperties;
  buttonsProps?: ArticleButtonsContainerProps;
  titleProps?: ArticleTitleProps;
  paragraphProps?: ArticleParagraphProps;
};

export default Article;
