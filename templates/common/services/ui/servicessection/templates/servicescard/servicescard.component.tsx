import { Service } from "pages/mechanic/dashboard";
import type { FC } from "react";
import { ServicesCardTitle } from "templates/common/services/ui/servicessection/templates/servicescard/ui/atoms";
import ServicesTable from "templates/common/services/ui/servicessection/templates/servicescard/ui/organisms/servicestable/servicestable.component";
import Card from "ui/molecules/card";
import { CardType } from "ui/molecules/card/cardtype.enum";
import { ServicesSectionProps } from "../../servicessection.component";
import styles from "./servicescard.module.scss";
import CurrentService from "./ui/organisms/currentservice/currentservice.component";
import NoServicesPanel from "./ui/organisms/servicestable/noservicestable.component";

const ServicesCard: FC<ServicesSectionProps> = ({
  services,
  title,
  statement,
  actionsbuttons,
  single,
  rowsPerPage,
}) => (
  <Card
    type={CardType.CUSTOM}
    className={styles.carCard}
    style={{
      padding: 0,
      margin: 0,
      height: "100%",
      cursor: "pointer",
      gap: 10,
    }}
  >
    <ServicesCardTitle title={title} />
    {(!services && single) ||
    (Array.isArray(services) && services.length === 0) ? (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <NoServicesPanel statement={statement} />
      </div>
    ) : null}
    {Array.isArray(services) && services.length > 0 ? (
      <ServicesTable
        services={services}
        actionsbuttons={actionsbuttons}
        rowsPerPage={rowsPerPage}
      />
    ) : null}
    {!!services && single ? (
      <CurrentService service={services as Service} />
    ) : null}
  </Card>
);

export default ServicesCard;
