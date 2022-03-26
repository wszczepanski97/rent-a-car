import { CSSProperties, ElementType } from "react";

const CardParagraph = ({ paragraphText, color = 'var(--second-text-color)', as: Tag = 'p', style}: CardParagraphProps) => (
    <Tag style={{ color, ...style }}>{paragraphText}</Tag>
);

export type CardParagraphProps = {
    paragraphText: string;
    color?: string;
    as?: ElementType;
    style?: CSSProperties;
}

export default CardParagraph;