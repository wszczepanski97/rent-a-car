import type { FC } from "react";
import PastRentalCardTitle from "templates/client/myrentals/ui/pastrentalsection/templates/pastrentalcard/ui/atoms/pastrentalcardtitle/pastrentalcardtitle.component";
import PastRentalTable from "templates/client/myrentals/ui/pastrentalsection/templates/pastrentalcard/ui/organisms/pastrentaltable/pastrentaltable.component";
import Card from "ui/molecules/card";
import { CardType } from "ui/molecules/card/cardtype.enum";
import { PastRentalSectionProps } from "../../pastrentalsection.component";
import styles from "./pastrentalcard.module.scss";

const PastRentalCard: FC<PastRentalSectionProps> = ({ rentals }) => (
  <Card type={CardType.CUSTOM} className={styles.carCard}>
    <PastRentalCardTitle />
    <PastRentalTable rentals={rentals} />
  </Card>
);

export default PastRentalCard;
