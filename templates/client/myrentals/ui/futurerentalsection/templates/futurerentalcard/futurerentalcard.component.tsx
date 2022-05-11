import { FC } from "react";
import { Card, CardType } from "ui";
import { FutureRentalSectionProps } from "../../futurerentalsection.component";
import styles from "./futurerentalcard.module.scss";
import { FutureRentalCardTitle } from "./ui";
import { FutureRentalTable } from "./ui/organisms";

const FutureRentalCard: FC<FutureRentalSectionProps> = ({ rentals }) => (
  <Card type={CardType.CUSTOM} className={styles.futureRentalCard}>
    <FutureRentalCardTitle />
    <FutureRentalTable rentals={rentals} />
  </Card>
);

export default FutureRentalCard;
