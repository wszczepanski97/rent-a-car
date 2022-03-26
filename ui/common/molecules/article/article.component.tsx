import { CSSProperties } from 'react';
import {
    ArticleTitle,
    ArticleTitleProps,
    ArticleParagraph,
    ArticleParagraphProps,
} from './atoms';
import { ArticleButtonsContainer, ArticleButtonsContainerProps } from './molecules';

const Article = ({ className, style, titleProps, paragraphProps, buttonsProps }: ArticleProps) => (
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
}

export default Article;
