import type { FC } from "react";
import FutureRentalCardTitle from "templates/client/myrentals/ui/futurerentalsection/templates/futurerentalcard/ui/atoms/futurerentalcardtitle/futurerentalcardtitle.component";
import FutureRentalTable from "templates/client/myrentals/ui/futurerentalsection/templates/futurerentalcard/ui/organisms/futurerentaltable/futurerentaltable.component";
import Card from "ui/molecules/card";
import { CardType } from "ui/molecules/card/cardtype.enum";
import { FutureRentalSectionProps } from "../../futurerentalsection.component";
import styles from "./futurerentalcard.module.scss";

const FutureRentalCard: FC<FutureRentalSectionProps> = ({ rentals }) => (
  <Card type={CardType.CUSTOM} className={styles.futureRentalCard}>
    <FutureRentalCardTitle />
    <FutureRentalTable rentals={rentals} />
  </Card>
);

export default FutureRentalCard;
