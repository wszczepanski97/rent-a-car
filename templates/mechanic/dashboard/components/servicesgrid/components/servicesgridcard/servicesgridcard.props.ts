import { Service } from "templates/mechanic/dashboard/types";

type OldServicesGridCardProps = {
  data?: Service[] | Service;
  title: string;
  statement: string;
  rowsPerPage?: number;
  actionsbuttons?: boolean;
  single?: boolean;
};

export type ServicesGridCardProps = {
  title: string;
};
