import type { FC } from "react";
import type { CarPageProps } from "templates/common/car/types/car.props";
import Card from "ui/molecules/card";
import { CardType } from "ui/molecules/card/cardtype.enum";
import CarCarousel from "../carcarousel";
import CarDescription from "../cardescription";
import styles from "./carcard.module.scss";
import CarCardTitle from "./components/carcardtitle";

const CarCard: FC<CarPageProps> = ({ car }) => (
  <Card type={CardType.CUSTOM} className={styles.carCard}>
    <CarCardTitle carName={`${car?.Marka} ${car?.Model}`} />
    <div className={styles.carCardInnerWrapper}>
      <CarCarousel photos={car?.Zdjecia!} />
      <CarDescription car={car} />
    </div>
  </Card>
);

export default CarCard;
