import type { FC } from "react";
import { ServicesGridCardProps } from "../../servicesgridcard.props";

type ServicesGridCardTitleProps = Pick<ServicesGridCardProps, "title">;

const ServicesGridCardTitle: FC<ServicesGridCardTitleProps> = ({ title }) => (
  <h3 style={{ textAlign: "center", color: "var(--text-color)" }}>{title}</h3>
);

export default ServicesGridCardTitle;
