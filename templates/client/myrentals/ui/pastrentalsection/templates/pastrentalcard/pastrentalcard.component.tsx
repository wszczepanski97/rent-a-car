import { FC } from "react";
import { Card, CardType } from "ui";
import { PastRentalSectionProps } from "../../pastrentalsection.component";
import styles from "./pastrentalcard.module.scss";
import { PastRentalCardTitle } from "./ui";
import { PastRentalTable } from "./ui/organisms";

const PastRentalCard: FC<PastRentalSectionProps> = ({ rentals }) => (
  <Card type={CardType.CUSTOM} className={styles.carCard}>
    <PastRentalCardTitle />
    <PastRentalTable rentals={rentals} />
  </Card>
);

export default PastRentalCard;
