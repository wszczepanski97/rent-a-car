import { CSSProperties, ElementType, FC } from "react";

const CardTitle: FC<CardTitleProps> = ({
  title,
  color = "var(--text-color)",
  as: Tag = "h3",
  style,
}: CardTitleProps) => <Tag style={{ color, ...style }}>{title}</Tag>;

export type CardTitleProps = {
  title: string;
  color?: string;
  as?: ElementType;
  style?: CSSProperties;
};

export default CardTitle;
