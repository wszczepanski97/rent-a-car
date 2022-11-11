import { FC } from "react";
import { CardTitleProps } from "./cardtitle.props";

const CardTitle: FC<CardTitleProps> = ({
  title,
  color = "var(--text-color)",
  as: Tag = "h3",
  style,
}) => <Tag style={{ color, ...style }}>{title}</Tag>;

export default CardTitle;
