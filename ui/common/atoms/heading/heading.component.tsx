import { CSSProperties, ElementType, FC } from "react";

const Heading: FC<HeadingProps> = ({
  text,
  color = "var(--text-color)",
  as: Tag = "h3",
  style,
}: HeadingProps) => <Tag style={{ color, ...style }}>{text}</Tag>;

export type HeadingProps = {
  text: string;
  color?: string;
  as?: ElementType;
  style?: CSSProperties;
};

export default Heading;
