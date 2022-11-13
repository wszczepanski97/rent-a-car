import type { FC } from "react";
import Card from "ui/molecules/card";
import { CardType } from "ui/molecules/card/cardtype.enum";
import { RentalSectionProps } from "../../rentalsection.props";
import RentalCardTitle from "./components/rentalcardtitle";
import RentalTable from "./components/rentaltable";
import styles from "./rentalcard.module.scss";

const RentalCard: FC<RentalSectionProps> = ({ rentals }) => (
  <Card type={CardType.CUSTOM} className={styles.rentalCard}>
    <RentalCardTitle />
    <RentalTable rentals={rentals} />
  </Card>
);

export default RentalCard;
