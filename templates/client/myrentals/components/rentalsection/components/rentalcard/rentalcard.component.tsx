import { SidebarContext } from "contexts/sidebar.context";
import { FC, useContext } from "react";
import { RentalSectionProps } from "templates/client/myrentals/components/rentalsection/rentalsection.props";
import Card from "ui/molecules/card";
import { CardType } from "ui/molecules/card/cardtype.enum";
import RentalCardTitle from "./components/rentalcardtitle";
import RentalTable from "./components/rentaltable";
import styles from "./rentalcard.module.scss";

const RentalCard: FC<RentalSectionProps> = ({ rentals, title, past }) => {
  const { open } = useContext(SidebarContext);
  return (
    <Card
      type={CardType.CUSTOM}
      className={styles.rentalCard}
      style={{ marginBottom: 50 }}
    >
      <RentalCardTitle title={title} />
      <RentalTable rentals={rentals} past={past} />
    </Card>
  );
};

export default RentalCard;
