import { Service } from "pages/mechanic/dashboard";
import { FC } from "react";
import { ServicesCard } from "./templates";

export type ServicesSectionProps = {
  services?: Service[] | Service;
  title: string;
  statement: string;
  rowsPerPage?: number;
  actionsbuttons?: boolean;
  single?: boolean;
};

const ServicesSection: FC<ServicesSectionProps> = (props) => (
  <>
    <ServicesCard {...props} />
  </>
);

export default ServicesSection;
