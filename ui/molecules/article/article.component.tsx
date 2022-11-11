import { FC } from "react";
import { ArticleProps } from "./article.props";
import ArticleButtonContainer from "./components/articlebuttoncontainer/articlebuttoncontainer.component";
import ArticleParagraph from "./components/articleparagraph/articleparagraph.component";
import ArticleTitle from "./components/articletitle/articletitle.component";

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

export default Article;
