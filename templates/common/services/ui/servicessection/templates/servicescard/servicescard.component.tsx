import { Service } from "pages/mechanic/dashboard";
import { FC } from "react";
import { Card, CardType } from "ui";
import { ServicesSectionProps } from "../../servicessection.component";
import styles from "./servicescard.module.scss";
import { ServicesCardTitle } from "./ui";
import { ServicesTable } from "./ui/organisms";
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
