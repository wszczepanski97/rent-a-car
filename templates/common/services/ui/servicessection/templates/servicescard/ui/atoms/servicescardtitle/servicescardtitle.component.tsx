import type { FC } from "react";
import { ServicesSectionProps } from "templates/common/services/ui/servicessection/servicessection.component";

type PastServicesCardTitleProps = Pick<ServicesSectionProps, "title">;
const PastServicesCardTitle: FC<PastServicesCardTitleProps> = ({ title }) => (
  <h3 style={{ textAlign: "center", color: "var(--text-color)" }}>{title}</h3>
);

export default PastServicesCardTitle;
