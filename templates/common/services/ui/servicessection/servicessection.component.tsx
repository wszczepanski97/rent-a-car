import { Service } from "pages/mechanic/dashboard";
import type { FC } from "react";
import ServicesCard from "templates/common/services/ui/servicessection/templates/servicescard/servicescard.component";

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
