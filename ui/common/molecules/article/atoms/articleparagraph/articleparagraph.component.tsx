import { ElementType } from "react";

const ArticleParagraph = ({ paragraphText, color = 'var(--light-text-color)', as: Tag = 'h4' }: ArticleParagraphProps) => (
    <Tag style={{ color }}>{paragraphText}</Tag>
);

export type ArticleParagraphProps = {
    paragraphText: string;
    color?: string;
    as?: ElementType;
}

export default ArticleParagraph;