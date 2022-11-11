import type { FC } from "react";
import { HeadingProps } from "./heading.props";

const Heading: FC<HeadingProps> = ({
  text,
  color = "var(--text-color)",
  as: Tag = "h3",
  style,
}: HeadingProps) => <Tag style={{ color, ...style }}>{text}</Tag>;

export default Heading;
