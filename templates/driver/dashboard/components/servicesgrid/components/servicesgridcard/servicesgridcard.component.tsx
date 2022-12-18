import type { FC } from "react";
import Card from "ui/molecules/card";
import { CardType } from "ui/molecules/card/cardtype.enum";
import ServicesGridCardTitle from "./components/servicesgridcardtitle/servicesgridcardtitle.component";
import styles from "./servicesgridcard.module.scss";
import { ServicesGridCardProps } from "./servicesgridcard.props";

const ServicesGridCard: FC<ServicesGridCardProps> = ({ children, title }) => (
  <Card
    type={CardType.CUSTOM}
    className={styles.servicesGridCard}
    style={{
      padding: 0,
      margin: 0,
      height: "100%",
      cursor: "pointer",
      gap: 10,
    }}
  >
    <ServicesGridCardTitle title={title} />
    {children}
  </Card>
);

export default ServicesGridCard;
